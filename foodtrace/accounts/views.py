from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, ListView
from .models import Account, SupplierProfile, CustomerProfile
from .permissions import admin_required, supplier_required, customer_features_required

# User Registration Views
def register_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        role = request.POST.get('role', 'customer')
        
        # Validation
        if password != confirm_password:
            messages.error(request, "Passwords don't match")
            return redirect('accounts:register')
        
        if Account.objects.filter(email=email).exists():
            messages.error(request, "Email already exists")
            return redirect('accounts:register')
        
        if Account.objects.filter(username=username).exists():
            messages.error(request, "Username already exists")
            return redirect('accounts:register')
        
        # Create user account
        user = Account.objects.create_user(
            email=email,
            username=username,
            password=password,
            role=role
        )
        
        # Create appropriate profile based on role
        if role == 'supplier':
            # For suppliers, redirect to a form to collect company details
            login(request, user)
            return redirect('accounts:create_supplier_profile')
        elif role == 'customer':
            CustomerProfile.objects.create(user=user)
            messages.success(request, "Account created successfully! Please login.")
            return redirect('accounts:login')
        
        messages.success(request, "Account created successfully! Please login.")
        return redirect('accounts:login')
    
    return render(request, 'accounts/register.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, "Logged in successfully!")
            
            # Redirect based on user role
            if user.is_admin():
                return redirect('accounts:admin_dashboard')
            elif user.is_supplier():
                return redirect('products:supplier_dashboard')
            else:
                return redirect('news:home')  # Default homepage for customers
        else:
            messages.error(request, "Invalid credentials")
    
    return render(request, 'accounts/login.html')

@login_required
def logout_view(request):
    logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('news:home')

@login_required
def create_supplier_profile(request):
    if not request.user.is_supplier():
        messages.error(request, "Only suppliers can access this page")
        return redirect('news:home')
    
    if hasattr(request.user, 'supplier_profile'):
        messages.info(request, "You already have a supplier profile")
        return redirect('products:supplier_dashboard')
    
    if request.method == 'POST':
        company_name = request.POST.get('company_name')
        license_number = request.POST.get('license_number')
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        certifications = request.POST.get('certifications')
        
        SupplierProfile.objects.create(
            user=request.user,
            company_name=company_name,
            license_number=license_number,
            address=address,
            phone=phone,
            certifications=certifications
        )
        
        messages.success(request, "Supplier profile created successfully! An admin will verify your account soon.")
        return redirect('products:supplier_dashboard')
    
    return render(request, 'accounts/create_supplier_profile.html')

# Password reset views
def password_reset_request(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = Account.objects.get(email=email)
            # In a real application, send email with reset link
            # For now, just redirect to a form to set new password (simplified)
            messages.success(request, "Password reset link sent to your email")
            return redirect('accounts:password_reset_confirm', user_id=user.id)
        except Account.DoesNotExist:
            messages.error(request, "No account found with that email")
    
    return render(request, 'accounts/password_reset_request.html')

def password_reset_confirm(request, user_id):
    try:
        user = Account.objects.get(id=user_id)
    except Account.DoesNotExist:
        messages.error(request, "Invalid user")
        return redirect('accounts:login')
    
    if request.method == 'POST':
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        if password != confirm_password:
            messages.error(request, "Passwords don't match")
            return redirect('accounts:password_reset_confirm', user_id=user_id)
        
        user.set_password(password)
        user.save()
        messages.success(request, "Password reset successfully. Please login with your new password.")
        return redirect('accounts:login')
    
    return render(request, 'accounts/password_reset_confirm.html')

# Role-specific dashboard views
@admin_required
def admin_dashboard(request):
    pending_suppliers = SupplierProfile.objects.filter(verified_by_admin=False)
    return render(request, 'accounts/admin_dashboard.html', {
        'pending_suppliers': pending_suppliers
    })

@admin_required
def verify_supplier(request, supplier_id):
    try:
        supplier_profile = SupplierProfile.objects.get(id=supplier_id)
        supplier_profile.verified_by_admin = True
        supplier_profile.save()
        messages.success(request, f"Supplier {supplier_profile.company_name} has been verified successfully")
    except SupplierProfile.DoesNotExist:
        messages.error(request, "Supplier not found")
    
    return redirect('accounts:admin_dashboard')

@login_required
def profile_view(request):
    user = request.user
    context = {'user': user}
    
    if user.is_supplier():
        try:
            supplier_profile = user.supplier_profile
            context['profile'] = supplier_profile
        except:
            pass
    elif user.is_customer():
        try:
            customer_profile = user.customer_profile
            context['profile'] = customer_profile
        except:
            pass
    
    return render(request, 'accounts/profile.html', context)
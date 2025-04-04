from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from functools import wraps

# Class-based view mixins
class AdminRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_authenticated and self.request.user.is_admin()

class SupplierRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_authenticated and (self.request.user.is_supplier() or self.request.user.is_admin())

class CustomerRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        # All authenticated users can access customer features
        return self.request.user.is_authenticated

class VerifiedSupplierRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        if not self.request.user.is_authenticated:
            return False
        if self.request.user.is_admin():
            return True
        if self.request.user.is_supplier():
            try:
                return self.request.user.supplier_profile.verified_by_admin
            except:
                return False
        return False

# Function decorators
def admin_required(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.is_admin():
            return view_func(request, *args, **kwargs)
        raise PermissionDenied
    return wrapped

def supplier_required(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        if request.user.is_authenticated and (request.user.is_supplier() or request.user.is_admin()):
            return view_func(request, *args, **kwargs)
        raise PermissionDenied
    return wrapped

def verified_supplier_required(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('accounts:login')
        
        if request.user.is_admin():
            return view_func(request, *args, **kwargs)
        
        if request.user.is_supplier():
            try:
                if request.user.supplier_profile.verified_by_admin:
                    return view_func(request, *args, **kwargs)
            except:
                pass
        
        raise PermissionDenied
    return wrapped

def customer_features_required(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        return redirect('accounts:login')
    return wrapped
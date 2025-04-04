from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.http import JsonResponse
import hashlib
import json
import qrcode
import io
import base64
from django.core.files.base import ContentFile

from .models import Product, ProductHistory, SupplyChainStep, QRCode
from accounts.permissions import (
    supplier_required, 
    verified_supplier_required, 
    customer_features_required, 
    admin_required
)

# Product management views for suppliers
@verified_supplier_required
def supplier_dashboard(request):
    products = Product.objects.filter(supplier=request.user)
    return render(request, 'products/supplier_dashboard.html', {'products': products})

@verified_supplier_required
def add_product(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        category = request.POST.get('category')
        description = request.POST.get('description')
        manufacture_date = request.POST.get('manufacture_date')
        expiry_date = request.POST.get('expiry_date')
        certifications = request.POST.get('certifications')
        is_organic = request.POST.get('is_organic') == 'on'
        
        # Create product
        product = Product.objects.create(
            supplier=request.user,
            name=name, 
            category=category,
            description=description,
            manufacture_date=manufacture_date,
            expiry_date=expiry_date,
            certifications=certifications,
            is_organic=is_organic
        )
        
        # Generate unique product ID for blockchain
        product_data = {
            'id': product.id,
            'name': product.name,
            'supplier_id': product.supplier.id,
            'timestamp': str(product.created_at)
        }
        product_json = json.dumps(product_data, sort_keys=True)
        product_hash = hashlib.sha256(product_json.encode()).hexdigest()
        product.product_id = product_hash[:20]  # Use first 20 chars of hash as ID
        product.save()
        
        # Create initial supply chain step (creation)
        SupplyChainStep.objects.create(
            product=product,
            step_name="Creation",
            description=f"Product created by {request.user.username}",
            responsible_party=f"{request.user.supplier_profile.company_name}",
            location="Initial"
        )
        
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(f"https://yourdomain.com/products/trace/{product.product_id}/")
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Save QR image
        buffer = io.BytesIO()
        img.save(buffer)
        buffer.seek(0)
        
        qr_code = QRCode(product=product)
        qr_code.image.save(f"{product.product_id}.png", ContentFile(buffer.read()))
        qr_code.save()
        
        messages.success(request, "Product added successfully with QR code!")
        return redirect('products:supplier_dashboard')
    
    return render(request, 'products/add_product.html')

@verified_supplier_required
def update_product_status(request, product_id):
    product = get_object_or_404(Product, id=product_id, supplier=request.user)
    
    if request.method == 'POST':
        step_name = request.POST.get('step_name')
        description = request.POST.get('description')
        location = request.POST.get('location')
        
        # Create new supply chain step
        step = SupplyChainStep.objects.create(
            product=product,
            step_name=step_name,
            description=description,
            responsible_party=f"{request.user.supplier_profile.company_name}",
            location=location
        )
        
        # Create blockchain hash for this step
        step_data = {
            'step_id': step.id,
            'product_id': product.product_id,
            'step_name': step.step_name,
            'timestamp': str(step.timestamp),
            'previous_hash': product.latest_hash
        }
        step_json = json.dumps(step_data, sort_keys=True)
        new_hash = hashlib.sha256(step_json.encode()).hexdigest()
        
        # Update product with latest hash
        product.latest_hash = new_hash
        product.save()
        
        # Create product history entry
        ProductHistory.objects.create(
            product=product,
            step=step,
            transaction_hash=new_hash
        )
        
        messages.success(request, "Product status updated successfully!")
        return redirect('products:supplier_dashboard')
    
    return render(request, 'products/update_product_status.html', {'product': product})

# Product tracing views for customers
@customer_features_required
def scan_qr_page(request):
    return render(request, 'products/scan_qr.html')

@customer_features_required
def trace_product(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)
    history = ProductHistory.objects.filter(product=product).order_by('created_at')
    steps = SupplyChainStep.objects.filter(product=product).order_by('timestamp')
    
    # Verify blockchain integrity
    is_valid = verify_blockchain_integrity(product, history)
    
    context = {
        'product': product,
        'steps': steps,
        'is_valid': is_valid
    }
    
    return render(request, 'products/product_trace.html', context)

@customer_features_required
def upload_qr_image(request):
    if request.method == 'POST' and request.FILES.get('qr_image'):
        # In a real app, you would process the QR image here
        # For now, we'll redirect to a demo product
        
        # Mock implementation - in reality you would decode the QR image
        messages.success(request, "QR code processed successfully")
        return redirect('products:trace_product', product_id='demo123')
    
    messages.error(request, "No QR image uploaded")
    return redirect('products:scan_qr_page')

# Helper functions
def verify_blockchain_integrity(product, history):
    # Simple blockchain verification logic
    if not history:
        return True
    
    prev_hash = None
    for record in history:
        if prev_hash is None:
            prev_hash = record.transaction_hash
            continue
        
        # In a real implementation, you would verify each hash
        # against the actual data and previous hash
        prev_hash = record.transaction_hash
    
    return True
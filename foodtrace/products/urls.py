from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    # Supplier routes
    path('supplier-dashboard/', views.supplier_dashboard, name='supplier_dashboard'),
    path('add-product/', views.add_product, name='add_product'),
    path('update-product/<int:product_id>/', views.update_product_status, name='update_product_status'),
    
    # Customer routes
    path('scan-qr/', views.scan_qr_page, name='scan_qr_page'),
    path('upload-qr/', views.upload_qr_image, name='upload_qr_image'),
    path('trace/<str:product_id>/', views.trace_product, name='trace_product'),
]
from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.product_home, name='product_entrypoint'),  # <-- Sản phẩm chính
    path('supplier/dashboard/', views.supplier_dashboard, name='supplier_dashboard'),
    path('customer/', views.customer_products, name='customer_products'),
    path('scan/', views.scan_qr_page, name='scan_qr_page'),
    path('upload-qr/', views.upload_qr_image, name='upload_qr_image'),
    path('trace/<str:product_id>/', views.trace_product, name='trace_product'),
    path('supplier/add/', views.add_product, name='add_product'),
    path('supplier/update/<int:product_id>/', views.update_product_status, name='update_product_status'),

]
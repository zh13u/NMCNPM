from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    # Authentication URLs
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # Password reset
    path('password-reset/', views.password_reset_request, name='password_reset'),
    path('password-reset-confirm/<int:user_id>/', views.password_reset_confirm, name='password_reset_confirm'),
    
    # Profile management
    path('profile/', views.profile_view, name='profile'),
    path('create-supplier-profile/', views.create_supplier_profile, name='create_supplier_profile'),
    
    # Admin functionality
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('verify-supplier/<int:supplier_id>/', views.verify_supplier, name='verify_supplier'),
]
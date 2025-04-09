from django.urls import path
from . import views

app_name = 'accounts'  # Đăng ký namespace

urlpatterns = [
    path('', views.home, name='home'),  # Trang chủ của accounts
    path('login/', views.login_view, name='login'),  # Trang đăng nhập
]
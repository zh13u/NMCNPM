from django.urls import path
from . import views

app_name = 'users'  # Namespace để tránh xung đột URL

urlpatterns = [
    path('', views.user_list, name='user_list'),  # Danh sách người dùng
    path('<int:pk>/', views.user_detail, name='user_detail'),  # Chi tiết người dùng
]
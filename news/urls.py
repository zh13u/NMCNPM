from django.urls import path
from . import views

app_name = 'news'  # Namespace để tránh xung đột URL

urlpatterns = [
    path('', views.news_list, name='news_list'),  # Danh sách tin tức
    path('<int:pk>/', views.news_detail, name='news_detail'),  # Chi tiết tin tức
]
from django.shortcuts import render, get_object_or_404
from .models import News

def news_list(request):
    news_items = News.objects.all()
    return render(request, 'news/news_list.html', {'news_items': news_items})

def news_detail(request, pk):
    news = get_object_or_404(News, pk=pk)
    return render(request, 'news/news_detail.html', {'news': news})
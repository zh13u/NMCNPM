from django.shortcuts import render, get_object_or_404
from .models import UserProfile

def user_list(request):
    users = UserProfile.objects.all()
    return render(request, 'users/user_list.html', {'users': users})

def user_detail(request, pk):
    user = get_object_or_404(UserProfile, pk=pk)
    return render(request, 'users/user_detail.html', {'user': user})
from django.db import models
from django.contrib.auth.models import AbstractUser

class Account(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Thêm related_name để tránh xung đột
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='account_groups',  # Đặt tên riêng để tránh xung đột với auth.User
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='account_user_permissions',  # Đặt tên riêng để tránh xung đột với auth.User
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username
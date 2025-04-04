from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, username, password, **extra_fields)

class Account(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('supplier', 'Supplier'),
        ('customer', 'Customer'),
    )
    
    email = models.EmailField(max_length=255, unique=True, default="example@example.com")
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)  # Email verification
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    
    objects = AccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    
    # Role-based permissions
    def is_admin(self):
        return self.role == 'admin'
    
    def is_supplier(self):
        return self.role == 'supplier'
    
    def is_customer(self):
        return self.role == 'customer'

class SupplierProfile(models.Model):
    user = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='supplier_profile')
    company_name = models.CharField(max_length=255)
    license_number = models.CharField(max_length=100, unique=True)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    certifications = models.TextField(blank=True, null=True)
    verified_by_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return self.company_name

class CustomerProfile(models.Model):
    user = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='customer_profile')
    phone = models.CharField(max_length=20, blank=True, null=True)
    preferences = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.user.username
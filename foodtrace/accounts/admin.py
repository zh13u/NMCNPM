from django.contrib import admin
from .models import Account, SupplierProfile, CustomerProfile

@admin.register(SupplierProfile)
class SupplierProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'company_name', 'verified_by_admin')
    list_filter = ('verified_by_admin',)
    search_fields = ('company_name', 'user__username', 'user__email')

@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('user',)

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'is_active')
    list_filter = ('role', 'is_active')
    search_fields = ('username', 'email')

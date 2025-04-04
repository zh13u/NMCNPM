from django.db import models
from accounts.models import Account

class Product(models.Model):
    product_id = models.CharField(max_length=50, unique=True, null=True)
    supplier = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    description = models.TextField()
    manufacture_date = models.DateField()
    expiry_date = models.DateField()
    certifications = models.TextField(blank=True, null=True)
    is_organic = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    latest_hash = models.CharField(max_length=64, blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.product_id})"
    
    def get_full_history(self):
        return self.history.all().order_by('created_at')

class SupplyChainStep(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='steps')
    step_name = models.CharField(max_length=100)
    description = models.TextField()
    responsible_party = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.step_name} - {self.product.name}"

class ProductHistory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='history')
    step = models.ForeignKey(SupplyChainStep, on_delete=models.CASCADE, related_name='history_records')
    transaction_hash = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"History: {self.product.name} - {self.step.step_name}"

class QRCode(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='qr_code')
    image = models.ImageField(upload_to='qrcodes/')
    generated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"QR: {self.product.name}"
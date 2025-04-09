from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    origin = models.CharField(max_length=100)
    production_date = models.DateField()
    blockchain_hash = models.CharField(max_length=256, unique=True)  # Hash blockchain
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
from django.db import models
from accounts.models import Account

# Create your models here.
class User(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
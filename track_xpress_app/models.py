from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import Group, Permission

class Drivers(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='track_xpress_users')
    user_permissions = models.ManyToManyField(Permission, related_name='track_xpress_users')
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone_number']
    email_verified = models.BooleanField(default=False)
    phone_number_verified = models.BooleanField(default=False)

class Customers(models.Model):
    driver_id = models.ForeignKey(Drivers, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_at = models.DateTimeField(auto_now_add=True)



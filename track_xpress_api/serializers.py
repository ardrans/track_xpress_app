from rest_framework import serializers
from .models import Drivers, Customers
from django.contrib.auth import authenticate
import hashlib


class DriversSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drivers
        fields = ['name', 'password', 'email', 'phone_number']
        extra_kwargs = {'password': {'write_only': True}}
class CustomersSerializer(serializers.ModelSerializer):
    driver_id = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Customers
        fields = '__all__'




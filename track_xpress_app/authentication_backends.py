from django.contrib.auth.backends import ModelBackend
from .models import Drivers
import hashlib

class CustomAuthenticationBackend(ModelBackend):
    user_class = Drivers
    def authenticate(self, request, phone_number=None, password=None, **kwargs):
        try:
            user = self.user_class.objects.get(phone_number=phone_number)
        except self.user_class.DoesNotExist:
            return None
        hashed_password = hashlib.md5(password.encode()).hexdigest()
        if user.password == hashed_password:
            print(user.id)
            return user

        return None

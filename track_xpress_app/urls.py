from django.urls import path
from .views import register,verify_email, verify_otp, login


urlpatterns = [
    path('register/', register.Register.as_view(), name='register'),
    path('verify_email/<str:key>/', verify_email.verify_email.as_view(), name='verify_email'),
    path('verify_otp/', verify_otp.OTPVerification.as_view(), name='verify_otp'),
    path('login/', login.Login.as_view(), name='login'),
]
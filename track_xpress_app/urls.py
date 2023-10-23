from django.urls import path
from .views import register,verify_email, verify_otp, login, customer_management, logout


urlpatterns = [
    path('register/', register.Register.as_view(), name='register'),
    path('verify_email/<str:key>/', verify_email.verify_email, name='verify_email'),
    path('verify_otp/', verify_otp.OTPVerification.as_view(), name='verify_otp'),
    path('login/', login.Login.as_view(), name='login'),
    path('create_customers/', customer_management.CreateCustomers.as_view(), name='create_customers'),
    path('customers/<int:pk>/', customer_management.UpdateDeleteCustomers.as_view(), name='customers'),
    path('list_customers/', customer_management.ListCustomers.as_view(), name='list_customers'),
    path('logout/', logout.Logout.as_view(), name='logout'),
]
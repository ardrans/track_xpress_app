from ..utils.mail_utils import *
from ..utils.redis_utils import RedisUtil
from django.core.exceptions import ValidationError
from ..models import Drivers
from django.http import HttpResponse


redis_client = RedisUtil()

def verify_email(request, key):
    secret_token = request.GET.get('KEY')
    if not secret_token:
        raise ValidationError('secret token is missing')
    user_mail = redis_client.get(secret_token)
    if not user_mail:
        raise ValidationError('invalid key')
    user = Drivers.objects.get(email=user_mail)
    user.email_verified = True
    user.save()
    return HttpResponse('Email verification successful!')
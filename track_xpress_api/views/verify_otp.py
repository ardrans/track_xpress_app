from ..utils.redis_utils import RedisUtil
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Drivers

redis_util = RedisUtil()


class OTPVerification(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        user_entered_otp = request.data.get('otp')

        stored_otp = redis_util.get(phone_number)

        if stored_otp:
            if user_entered_otp == stored_otp:
                user = Drivers.objects.get(phone_number=phone_number)
                user.phone_number_verified = True
                user.save()
                return Response({'message': 'Phone number verified.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'OTP has expired or is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

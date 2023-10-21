
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from django.http import JsonResponse


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "status": "success",
                "message": "Access token generated successfully.",
                "data": {
                    "access_token": token.key,
                    "expires_in": 3600,
                }

            })
        except AuthenticationFailed as e:
            error_message = "Invalid username or password."
            print(f"Authentication failed: {str(e)}")
            return Response({
                "status": "error",
                "message": error_message,
            }, status=400)

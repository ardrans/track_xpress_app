from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import Customers
from rest_framework.authentication import TokenAuthentication
from ..serializers import CustomersSerializer
from rest_framework import status
from rest_framework.response import Response

class CreateCustomers(generics.CreateAPIView):
    serializer_class = CustomersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        serializer.save(driver_id=self.request.user)

class UpdateDeleteCustomers(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customers.objects.all()
    serializer_class = CustomersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ListCustomers(generics.ListAPIView):
    serializer_class = CustomersSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Customers.objects.filter(driver_id=user.id)

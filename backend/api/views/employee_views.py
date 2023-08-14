from rest_framework import viewsets, mixins
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import Employee
from api.serializers import CreateCompanyOwnerSerializer
from rest_framework.permissions import AllowAny


class CreateCompanyOwnerView(generics.CreateAPIView):
    """
    Create a company owner.
    """

    permission_classes = [AllowAny]
    serializer_class = CreateCompanyOwnerSerializer

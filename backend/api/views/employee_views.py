from rest_framework import viewsets, mixins
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import Employee
from api.serializers import CreateCompanyOwnerSerializer
from rest_framework.permissions import AllowAny
from api.serializers import EmployeeSerializer
from rest_framework.permissions import IsAuthenticated


class CreateCompanyOwnerView(generics.CreateAPIView):
    """
    Create a company owner.
    """

    permission_classes = [AllowAny]
    serializer_class = CreateCompanyOwnerSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

    # def get_queryset(self):
    #     user_company = self.request.user.employee.company
    #     return Employee.objects.filter(company=user_company)

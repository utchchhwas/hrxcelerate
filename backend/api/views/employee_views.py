from rest_framework import viewsets, mixins
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import Employee
from api.serializers import CreateCompanyOwnerSerializer
from rest_framework.permissions import AllowAny, SAFE_METHODS
from api.serializers import EmployeeSerializer
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsEmployee, IsAdminEmployee


class CreateCompanyOwnerView(generics.CreateAPIView):
    """
    Create a company owner.
    """

    permission_classes = [AllowAny]
    serializer_class = CreateCompanyOwnerSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    Provides the following actions:
        - Create Employee
        - Retrieve Employee List
        - Retrieve Employee
        - Update Employee
        - Destroy Employee
    """

    serializer_class = EmployeeSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Employee.objects.none()
        company = user.employee.company
        return Employee.objects.filter(company=company)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated(), IsEmployee()]
        return [IsAuthenticated(), IsAdminEmployee()]

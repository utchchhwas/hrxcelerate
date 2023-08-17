from rest_framework import viewsets, mixins
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import Employee
from api.serializers import CreateCompanyOwnerSerializer
from rest_framework.permissions import AllowAny, SAFE_METHODS
from api.serializers import EmployeeSerializer
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


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

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "user",
        "user__email",
        "manager",
        "is_owner",
        "is_admin",
        "is_active",
        "employments__job_role",
        "employments__job_role__department",
        "employments__is_active",
        "employments__employment_type",
        "employments__is_remote",
    ]
    search_fields = [
        "user__email",
        "user__first_name",
        "user__last_name",
        "manager__user__email",
        "employments__job_role__name",
        "employments__job_role__department__name",
    ]
    ordering_fields = [
        "user",
        "user__email",
        "user__first_name",
        "user__last_name",
        "employments__job_role",
        "employments__job_role__department",
    ]
    ordering = ["user"]

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

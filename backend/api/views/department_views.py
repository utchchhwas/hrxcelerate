from rest_framework import viewsets
from api.models import Department
from api.serializers import DepartmentSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    Provides the following actions:
        - Create Department
        - Retrieve Department List
        - Retrieve Department
        - Update Department
        - Destroy Department
    """

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["id", "name"]
    search_fields = ["name"]
    ordering_fields = ["id", "name"]
    ordering = ["name"]

    serializer_class = DepartmentSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Department.objects.none()
        company = user.employee.company
        return Department.objects.filter(company=company)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated(), IsEmployee()]
        return [IsAuthenticated(), IsAdminEmployee()]

from rest_framework.viewsets import ModelViewSet
from api.models import Department
from api.serializers import DepartmentSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class DepartmentViewSet(ModelViewSet):
    """ """

    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ["name"]
    ordering_fields = ["id", "name"]
    ordering = ["name"]
    filterset_fields = ["id", "name"]

    serializer_class = DepartmentSerializer

    def get_queryset(self):
        user_company = self.request.user.employee.company
        return Department.objects.filter(company=user_company)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdminEmployee()]

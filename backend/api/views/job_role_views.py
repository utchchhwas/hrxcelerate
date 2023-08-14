from rest_framework.viewsets import ModelViewSet
from api.models import JobRole
from api.serializers import JobRoleSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class JobRoleViewSet(ModelViewSet):
    """ """

    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ["name"]
    ordering_fields = ["id", "name"]
    ordering = ["name"]
    filterset_fields = ["id", "name", "department"]

    serializer_class = JobRoleSerializer

    def get_queryset(self):
        user_company = self.request.user.employee.company
        return JobRole.objects.filter(department__company=user_company)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdminEmployee()]

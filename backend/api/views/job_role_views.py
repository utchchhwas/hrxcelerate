from rest_framework import viewsets
from api.models import JobRole
from api.serializers import JobRoleSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class JobRoleViewSet(viewsets.ModelViewSet):
    """
    Provides the following actions:
        - Create Job Role
        - Retrieve Job Role List
        - Retrieve Job Role
        - Update Job Role
        - Destroy Job Role
    """

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["id", "department", "name"]
    search_fields = ["name", "department__name"]
    ordering_fields = ["id", "name"]
    ordering = ["name"]

    serializer_class = JobRoleSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return JobRole.objects.none()
        company = user.employee.company
        return JobRole.objects.filter(department__company=company)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated(), IsEmployee()]
        return [IsAuthenticated(), IsAdminEmployee()]

from rest_framework import viewsets
from api.models import Employment
from api.serializers import EmploymentSerializer
from api.permissions import CompanyPermissionMixin
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class EmploymentViewSet(
    CompanyPermissionMixin,
    viewsets.ModelViewSet,
):
    """
    Provides the following actions:
        - Create Employment
        - Retrieve Employment List
        - Retrieve Employment
        - Update Employment
        - Destroy Employment
    """

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "id",
        "employee",
        "job_role",
        "is_active",
        "employment_type",
        "is_remote",
    ]
    search_fields = ["employee__user__email", "job_role__name"]
    ordering_fields = ["id", "employee__user__email", "job_role__name"]
    ordering = ["id"]

    serializer_class = EmploymentSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Employment.objects.none()
        company = user.employee.company
        return Employment.objects.filter(employee__company=company)

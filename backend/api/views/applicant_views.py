from rest_framework import viewsets, mixins
from api.models import Applicant
from api.serializers import PublicApplicantSerializer, ApplicantSerializer
from rest_framework.permissions import AllowAny
from api.permissions import CompanyPermissionMixin
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class PublicApplicantViewSet(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    """
    View for applicants to apply to a job posting.
    """

    permission_classes = [AllowAny]
    serializer_class = PublicApplicantSerializer


class ApplicantViewSet(
    CompanyPermissionMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    ViewSet for Applicant.
    """

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "id",
        "job_posting",
        "job_posting__job_role",
        "job_posting__job_role__department",
        "email",
        "status",
    ]
    search_fields = [
        "first_name",
        "last_name",
        "email",
        "job_posting__job_role__name",
        "job_posting__job_role__department__name",
    ]
    ordering_fields = ["email", "job_posting", "status", "applied_at"]
    ordering = ["email"]

    serializer_class = ApplicantSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Applicant.objects.none()
        company = user.employee.company
        return Applicant.objects.filter(
            job_posting__job_role__department__company=company
        )

from rest_framework import viewsets
from api.models import JobPosting
from api.serializers import JobPostingSerializer, PublicJobPostingSerializer
from api.permissions import CompanyPermissionMixin
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny


class JobPostingViewSet(
    CompanyPermissionMixin,
    viewsets.ModelViewSet,
):
    """
    Provides the following actions:
        - Create Job Posting
        - Retrieve Job Posting List
        - Retrieve Job Posting
        - Update Job Posting
        - Destroy Job Posting
    """

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "id",
        "job_role",
        "job_role__department",
        "is_active",
    ]
    search_fields = [
        "job_role__name",
        "tags",
    ]
    ordering_fields = [
        "job_role__name",
        "job_role",
    ]
    ordering = [
        "job_role__name",
    ]

    serializer_class = JobPostingSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return JobPosting.objects.none()
        company = user.employee.company
        return JobPosting.objects.filter(job_role__department__company=company)


class PublicJobPostingViewSet(
    viewsets.ReadOnlyModelViewSet,
):
    """
    Provides the following actions:
        - Retrieve Public Job Posting List
        - Retrieve Public Job Posting
    """

    permission_classes = [AllowAny]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "id",
        "job_role",
        "job_role__department__company",
    ]
    search_fields = [
        "job_role__name",
        "tags",
        "job_role__department__company__name",
    ]
    ordering_fields = [
        "job_role__name",
    ]
    ordering = [
        "job_role__name",
    ]

    serializer_class = PublicJobPostingSerializer
    queryset = JobPosting.objects.filter(is_active=True)

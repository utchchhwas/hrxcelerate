from rest_framework.viewsets import ModelViewSet
from api.models import Interviewer
from api.serializers import JobPostingInterviewerSerializer
from rest_framework import viewsets
from api.models import JobRole
from api.serializers import InterviewerSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from api.permissions import CompanyPermissionMixin


class InterviewerViewSet(
    viewsets.ModelViewSet,
):
    """
    Provides the following actions:
        - Create Interviewer
        - Retrieve Interviewer List
        - Retrieve Interviewer
        - Update Interviewer
        - Destroy Interviewer
    """

    permission_classes = [IsAuthenticated, IsAdminEmployee]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "id",
        "job_posting",
        "employee",
    ]
    search_fields = []
    ordering_fields = []
    ordering = []

    serializer_class = InterviewerSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Interviewer.objects.none()
        company = user.employee.company
        return Interviewer.objects.filter(employee__company=company)

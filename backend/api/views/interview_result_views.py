from rest_framework import viewsets
from api.models import InterviewResult
from api.serializers import InterviewResultSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from api.permissions import CompanyPermissionMixin


class InterviewResultViewSet(
    viewsets.ModelViewSet,
):
    """
    ViewSet for InterviewResult.
    """

    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "id",
        "interviewer",
        "applicant",
    ]
    search_fields = []
    ordering_fields = []
    ordering = []

    serializer_class = InterviewResultSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return InterviewResult.objects.none()
        company = user.employee.company
        return InterviewResult.objects.filter(interviewer__employee__company=company)

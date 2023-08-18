from rest_framework import viewsets, mixins
from api.models import Applicant
from api.serializers import PublicApplicantSerializer, ApplicantSerializer
from rest_framework.permissions import AllowAny
from api.permissions import CompanyPermissionMixin


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

    serializer_class = ApplicantSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Applicant.objects.none()
        company = user.employee.company
        return Applicant.objects.filter(
            job_posting__job_role__department__company=company
        )

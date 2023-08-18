from rest_framework import viewsets, mixins
from api.models import Applicant
from api.serializers import PublicApplicantSerializer
from rest_framework.permissions import AllowAny


class PublicApplicantViewSet(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    """
    View for applicants to apply to a job posting.
    """

    permission_classes = [AllowAny]
    serializer_class = PublicApplicantSerializer

from rest_framework.viewsets import ModelViewSet
from api.models import Applicant
from api.serializers import ApplicantSerializer


class ApplicantViewSet(ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
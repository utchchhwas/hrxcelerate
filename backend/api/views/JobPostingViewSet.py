from rest_framework.viewsets import ModelViewSet
from api.models import JobPosting
from api.serializers import JobPostingSerializer


class JobPostingViewSet(ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer

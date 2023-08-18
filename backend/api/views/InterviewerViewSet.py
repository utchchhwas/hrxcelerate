from rest_framework.viewsets import ModelViewSet
from api.models import Interview
from api.serializers import InterviewerSerializer


class InterviewerViewSet(ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewerSerializer

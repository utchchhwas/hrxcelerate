from rest_framework.viewsets import ModelViewSet
from api.models import InterviewResult
from api.serializers import InterviewResultSerializer


class InterviewResultViewSet(ModelViewSet):
    queryset = InterviewResult.objects.all()
    serializer_class = InterviewResultSerializer
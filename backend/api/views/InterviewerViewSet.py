from rest_framework.viewsets import ModelViewSet
from api.models import Interviewer
from api.serializers import InterviewerSerializer



class InterviewerViewSet(ModelViewSet):
    queryset = Interviewer.objects.all()
    serializer_class = InterviewerSerializer
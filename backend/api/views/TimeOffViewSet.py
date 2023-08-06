from rest_framework.viewsets import ModelViewSet
from api.models import TimeOff
from api.serializers import TimeOffSerializer


class TimeOffViewSet(ModelViewSet):
    queryset = TimeOff.objects.all()
    serializer_class = TimeOffSerializer

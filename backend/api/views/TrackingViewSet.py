from rest_framework.viewsets import ModelViewSet
from api.models import Tracking
from api.serializers import TrackingSerializer


class TrackingViewSet(ModelViewSet):
    queryset = Tracking.objects.all()
    serializer_class = TrackingSerializer
    
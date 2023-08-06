from rest_framework.viewsets import ModelViewSet
from api.models import Notification
from api.serializers import NotificationSerializer


class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
from rest_framework.viewsets import ModelViewSet
from api.models import CustomUser
from api.serializers import CustomUserSerializer


class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
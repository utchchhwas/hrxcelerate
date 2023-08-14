from rest_framework.viewsets import ModelViewSet
from api.models import CustomUser
from api.serializers import CustomUserSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsAdminEmployee


class CustomUserViewSet(ModelViewSet):
    """ """

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

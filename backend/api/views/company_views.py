from rest_framework import viewsets, mixins
from api.models import Company
from api.serializers import CompanySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS
from api.permissions import IsOwnerEmployee, IsAdminEmployee, IsCompanyObject


class RetrieveUpdateDestroyCompanyViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    Provides the following actions:
        - Retrieve Company List
        - Retrieve Company
        - Update Company
        - Destroy Company
    """

    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]
        elif self.request.method == "DELETE":
            return [IsAuthenticated(), IsOwnerEmployee(), IsCompanyObject()]
        else:
            return [IsAuthenticated(), IsAdminEmployee(), IsCompanyObject()]

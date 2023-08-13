from rest_framework import viewsets, mixins
from api.models import Company
from api.serializers import CompanySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS
from api.permissions import IsAdminEmployee, IsCompanyObject


class CompanyRetrieveUpdateViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    ViewSet for Company supporting the following actions:
        - Retrieve details
        - Update
    """

    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]
        else:
            return [IsAuthenticated(), IsAdminEmployee(), IsCompanyObject()]

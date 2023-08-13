from rest_framework import viewsets, mixins
from api.models import Company
from api.serializers import CompanySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS
from api.permissions import IsCompanyOwner, IsAdminEmployee, IsCompanyObject


class CompanyRetrieveUpdateDestroyViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """ """

    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [AllowAny()]
        elif self.request.method == "DELETE":
            return [IsAuthenticated(), IsCompanyOwner(), IsCompanyObject()]
        else:
            return [IsAuthenticated(), IsAdminEmployee(), IsCompanyObject()]

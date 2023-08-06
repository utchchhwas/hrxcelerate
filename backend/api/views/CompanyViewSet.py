from rest_framework.viewsets import ModelViewSet
from api.models import Company
from api.serializers import CompanySerializer


class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
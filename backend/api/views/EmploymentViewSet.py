from rest_framework.viewsets import ModelViewSet
from api.models import Employment
from api.serializers import EmploymentSerializer


class EmploymentViewSet(ModelViewSet):
    queryset = Employment.objects.all()
    serializer_class = EmploymentSerializer
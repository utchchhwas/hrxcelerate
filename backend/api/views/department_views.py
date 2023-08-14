from rest_framework.viewsets import ModelViewSet
from api.models import Department
from api.serializers import DepartmentSerializer


class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

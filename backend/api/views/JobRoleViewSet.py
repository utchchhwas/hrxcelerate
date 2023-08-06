from rest_framework.viewsets import ModelViewSet
from api.models import JobRole
from api.serializers import JobRoleSerializer


class JobRoleViewSet(ModelViewSet):
    queryset = JobRole.objects.all()
    serializer_class = JobRoleSerializer

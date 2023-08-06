from rest_framework.serializers import ModelSerializer
from api.models import JobRole


class JobRoleSerializer(ModelSerializer):
    class Meta:
        model = JobRole
        fields = "__all__"

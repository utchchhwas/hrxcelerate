from rest_framework import serializers
from api.models import Employment
from api.serializers import JobRoleSerializer
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


class EmploymentSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """ """

    class Meta:
        model = Employment
        fields = [
            "id",
            "employee",
            "job_role",
            "is_active",
            "start_date",
            "end_date",
            "employment_type",
            "is_remote",
            "note",
        ]
        expandable_fields = {
            "job_role": (JobRoleSerializer, {"expand": ["department"]}),
        }

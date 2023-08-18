from rest_framework import serializers
from api.models import JobPosting
from api.serializers import JobRoleSerializer
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


class JobPostingSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for JobPosting model.
    """

    class Meta:
        model = JobPosting
        fields = [
            "id",
            "job_role",
            "tags",
            "description",
            "is_active",
        ]
        expandable_fields = {
            "job_role": (
                JobRoleSerializer,
                {"expand": ["department"]},
            )
        }

    def validate_job_role(self, value):
        employee = self.context["request"].user.employee
        if value.department.company != employee.company:
            raise serializers.ValidationError("Invalid Job Role.")
        return value

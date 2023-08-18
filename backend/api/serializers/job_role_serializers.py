from rest_framework import serializers
from api.models import JobRole
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from api.serializers import DepartmentSerializer


class JobRoleSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for JobRole model.
    """

    class Meta:
        model = JobRole
        fields = [
            "id",
            "department",
            "name",
            "description",
        ]
        expandable_fields = {
            "department": (
                DepartmentSerializer,
                {"omit": ["description"]},
            )
        }

    def validate_department(self, department):
        employee = self.context["request"].user.employee
        if department.company != employee.company:
            raise serializers.ValidationError("Invalid department.")
        return department

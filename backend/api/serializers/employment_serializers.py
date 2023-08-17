from rest_framework import serializers
from api.models import Employment
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


class EmploymentSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for Employment model.
    """

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
            "salary",
            "salary_currency",
            "salary_frequency",
            "note",
        ]
        expandable_fields = {
            "employee": ("api.EmployeeSerializer", {"fields": ["user"]}),
            "job_role": ("api.JobRoleSerializer", {"expand": ["department"]}),
        }

    def validate_employee(self, value):
        if not value:
            return value

        employee = self.context["request"].user.employee
        if value.company != employee.company:
            raise serializers.ValidationError("Invalid employee.")
        return value

    def validate_job_role(self, value):
        if not value:
            return value

        employee = self.context["request"].user.employee
        if value.department.company != employee.company:
            raise serializers.ValidationError("Invalid job role.")
        return value

    def validate(self, attrs):
        start_date = attrs.get("start_date", None)
        end_date = attrs.get("end_date", None)

        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError(
                "Start date cannot be greater than end date."
            )

        return attrs

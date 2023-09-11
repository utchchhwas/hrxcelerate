from rest_framework import serializers
from api.models import Interviewer
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from api.serializers import EmployeeSerializer


class JobPostingInterviewerSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    class Meta:
        model = Interviewer
        fields = [
            "id",
            "job_posting",
            "employee",
        ]
        expandable_fields = {
            "employee": (
                EmployeeSerializer,
                {
                    "fields": ["user", "company", "active_job_role"],
                    "expand": ["active_job_role"],
                },
            )
        }


class InterviewerSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    class Meta:
        model = Interviewer
        fields = [
            "id",
            "job_posting",
            "employee",
        ]
        expandable_fields = {
            "job_posting": (
                "api.JobPostingSerializer",
                {
                    "fields": ["id", "job_role", "is_active"],
                    "expand": ["job_role"],
                },
            ),
            "employee": (
                EmployeeSerializer,
                {
                    "fields": ["user", "company", "active_job_role"],
                    "expand": ["active_job_role"],
                },
            ),
        }

    def validate_job_posting(self, value):
        employee = self.context["request"].user.employee
        if value.job_role.department.company != employee.company:
            raise serializers.ValidationError("Invalid Job Posting.")
        return value

    def validate_employee(self, value):
        employee = self.context["request"].user.employee
        if value.company != employee.company:
            raise serializers.ValidationError("Invalid Employee.")
        return value

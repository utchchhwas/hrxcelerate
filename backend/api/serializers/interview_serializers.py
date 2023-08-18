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

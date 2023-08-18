from rest_framework import serializers
from api.models import JobPosting
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


class JobPostingSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for JobPosting model.
    """

    job_role_name = serializers.CharField(source="job_role.name", read_only=True)

    class Meta:
        model = JobPosting
        fields = [
            "job_role",
            "job_role_name",
            "tags",
            "description",
            "is_active",
        ]

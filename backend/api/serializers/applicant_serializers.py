from rest_framework import serializers
from api.models import Applicant
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from api.serializers import JobPostingSerializer


class PublicApplicantSerializer(serializers.ModelSerializer):
    """
    Serializer for public applicant.
    """

    class Meta:
        model = Applicant
        fields = [
            "id",
            "job_posting",
            "email",
            "first_name",
            "last_name",
            "resume",
        ]


class ApplicantSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for public applicant.
    """

    class Meta:
        model = Applicant
        fields = [
            "id",
            "job_posting",
            "email",
            "first_name",
            "last_name",
            "resume",
            "status",
        ]
        extra_kwargs = {"job_posting": {"read_only": True}}
        expandable_fields = {
            "job_posting": (
                JobPostingSerializer,
                {"read_only": True, "expand": ["job_role"]},
            )
        }

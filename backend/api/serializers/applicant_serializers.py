from rest_framework import serializers
from api.models import Applicant


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

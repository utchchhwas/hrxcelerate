from rest_framework import serializers
from api.models import InterviewResult
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


class InterviewResultSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for InterviewResult model.
    """

    class Meta:
        model = InterviewResult
        fields = [
            "id",
            "applicant",
            "interviewer",
            "score",
            "note",
        ]
        expandable_fields = {
            "applicant": ("api.ApplicantSerializer", {}),
            "interviewer": ("api.InterviewerSerializer", {}),
        }

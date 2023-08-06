from rest_framework import serializers
from api.models import Interviewer


class InterviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interviewer
        fields = "__all__"

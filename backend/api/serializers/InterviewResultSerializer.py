from rest_framework import serializers
from api.models import InterviewResult


class InterviewResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewResult
        fields = "__all__"
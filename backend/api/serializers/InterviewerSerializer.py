from rest_framework import serializers
from api.models import Interview


class InterviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = "__all__"

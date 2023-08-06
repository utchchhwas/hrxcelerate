from rest_framework import serializers
from api.models import TimeOff


class TimeOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeOff
        fields = "__all__"
        
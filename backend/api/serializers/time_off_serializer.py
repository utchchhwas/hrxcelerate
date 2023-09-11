from rest_framework import serializers
from api.models import TimeOff


class TimeOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeOff
        fields = [
            "id",
            "employee",
            "start_time",
            "end_time",
            "status",
        ]

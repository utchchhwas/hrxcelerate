from rest_framework import serializers
from api.models import Tracking


class TrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracking
        fields = [
            "id",
            "employee",
            "start_time",
            "end_time",
            "note",
        ]

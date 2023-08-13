from rest_framework import serializers
from api.models import Company


class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for Company model.
    """

    class Meta:
        model = Company
        fields = (
            "id",
            "name",
            "motto",
            "description",
            "website",
            "address",
            "logo",
        )

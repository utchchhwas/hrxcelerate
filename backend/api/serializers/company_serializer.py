from rest_framework import serializers
from api.models import Company
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


class CompanySerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
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

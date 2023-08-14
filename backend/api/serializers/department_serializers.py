from rest_framework import serializers
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from api.models import Department
from api.serializers import CompanySerializer


class DepartmentSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for Department model.
    """

    class Meta:
        model = Department
        fields = [
            "id",
            "company",
            "name",
            "description",
        ]
        expandable_fields = {
            "company": CompanySerializer,
        }

    def create(self, validated_data):
        user_company = self.context["request"].user.employee.company
        provided_company = validated_data["company"]

        if user_company != provided_company:
            raise serializers.ValidationError(
                "You can only create departments in your company."
            )

        return super().create(validated_data)

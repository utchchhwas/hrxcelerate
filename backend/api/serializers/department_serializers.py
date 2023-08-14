from rest_framework import serializers
from api.models import Department


class DepartmentSerializer(serializers.ModelSerializer):
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

    def create(self, validated_data):
        print("In create")
        user_company = self.context["request"].user.employee.company
        provided_company = validated_data["company"]

        if user_company != provided_company:
            raise serializers.ValidationError(
                "You can only create departments in your company."
            )

        return super().create(validated_data)

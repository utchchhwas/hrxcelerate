from rest_framework.serializers import ModelSerializer, ValidationError
from api.models import JobRole
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from api.serializers import DepartmentSerializer
from api.models import Department


class JobRoleSerializer(
    FlexFieldsSerializerMixin,
    ModelSerializer,
):
    """ """

    class Meta:
        model = JobRole
        fields = [
            "id",
            "name",
            "department",
            "description",
        ]
        expandable_fields = {
            "department": (
                DepartmentSerializer,
                {"omit": ["description"]},
            )
        }

    def create(self, validated_data):
        user_company = self.context["request"].user.employee.company
        department = validated_data["department"]

        if department.company != user_company:
            raise ValidationError("Invalid department field.")

        return super().create(validated_data)

    def update(self, instance, validated_data):
        user_company = self.context["request"].user.employee.company
        department = validated_data.get("department", instance.department)

        if department.company != user_company:
            raise ValidationError("Invalid department field.")

        return super().update(instance, validated_data)

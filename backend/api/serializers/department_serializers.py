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

    def validate_company(self, company):
        """
        Check if the company is user's company.
        """
        employee = self.context["request"].user.employee
        if company != employee.company:
            raise serializers.ValidationError("Invalid company.")
        return company

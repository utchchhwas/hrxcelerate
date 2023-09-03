"""
Project serializers
    Maps Project models into JSON format
    Expnadable fields:
        - company
        - manager
"""
from rest_framework import serializers
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from api.models import Project
from api.serializers import CompanySerializer, EmployeeSerializer

class ProjectSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for Project model.
    """
    class Meta:
        model = Project
        fields = [
            "id",
            "company",
            "name",
            "manager",
            "start_date",
            "end_date",
            "budget",
        ]
        expandable_fields = {
            "company": CompanySerializer,
            "manager": EmployeeSerializer,
        }

    def validate_company(self, company):
        """
        Check if the company is user's company.
        """
        employee = self.context["request"].user.employee
        if company != employee.company:
            raise serializers.ValidationError("Invalid company.")
        return company
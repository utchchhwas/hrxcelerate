from rest_framework import serializers
from api.models import Employee, Company, CustomUser
from api.serializers import CustomUserSerializer, CompanySerializer
from django.conf import settings


class EmployeeSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    company = CompanySerializer()

    class Meta:
        model = Employee
        fields = "__all__"
        extra_kwargs = {
            "is_owner": {"read_only": True},
            "is_active": {"read_only": True},
        }

    def create(self, validated_data):
        print(validated_data)
        user_data = validated_data.pop("user")
        user = CustomUser.objects.create_user(**user_data)

        company_data = validated_data.pop("company")
        company = Company.objects.create(**company_data)

        validated_data["is_owner"] = True
        validated_data["is_admin"] = True
        validated_data["is_active"] = True
        employee = Employee.objects.create(user=user, company=company, **validated_data)
        return employee

    def update(self, instance, validated_data):
        print(validated_data)
        return super().update(instance, validated_data)
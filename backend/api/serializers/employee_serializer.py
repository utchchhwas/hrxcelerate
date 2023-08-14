from rest_framework import serializers
from api.models import Employee, Company, CustomUser
from api.serializers import CustomUserSerializer, CompanySerializer
from django.conf import settings
from rest_framework import validators


class CreateCompanyOwnerSerializer(serializers.ModelSerializer):
    """ """

    email = serializers.EmailField(
        source="user.email",
        validators=[
            validators.UniqueValidator(
                CustomUser.objects.all(),
                message="A user with this email already exists.",
            )
        ],
        label="Email",
    )
    password = serializers.CharField(
        source="user.password",
        write_only=True,
        label="Password",
    )
    first_name = serializers.CharField(
        source="user.first_name",
        label="First Name",
    )
    last_name = serializers.CharField(
        source="user.last_name",
        label="Last Name",
    )
    company_name = serializers.CharField(
        source="company.name",
        label="Company Name",
    )

    class Meta:
        model = Employee
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "company_name",
        )

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        company_data = validated_data.pop("company")
        validated_data["is_owner"] = True
        validated_data["is_admin"] = True
        validated_data["is_active"] = True

        company = Company.objects.create(**company_data)
        employee = Employee.objects.create_with_user(
            user_data=user_data, company=company, **validated_data
        )

        return employee

from rest_framework import serializers
from api.models import Employee, Company, CustomUser
from django.conf import settings
from rest_framework import validators
from django.contrib.auth.password_validation import validate_password
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from api.serializers import (
    EmployeeUserSerializer,
    CompanySerializer,
    JobRoleSerializer,
    EmploymentSerializer,
)


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
        validators=[validate_password],
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


class EmployeeSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for Employee model.
    """

    user = EmployeeUserSerializer()
    active_job_role = serializers.PrimaryKeyRelatedField(
        read_only=True, label="Active Job Role"
    )

    class Meta:
        model = Employee
        fields = [
            "user",
            "company",
            "manager",
            "is_owner",
            "is_admin",
            "is_active",
            "gender",
            "date_of_birth",
            "avatar",
            "active_job_role",
        ]
        expandable_fields = {
            "company": CompanySerializer,
            "manager": "api.EmployeeSerializer",
            "active_job_role": (JobRoleSerializer, {"expand": ["department"]}),
        }

    def validate_user(self, value):
        email = value["email"]
        print(email, self.instance)

        qs = CustomUser.objects.filter(email=email)
        if self.instance:
            qs = qs.exclude(pk=self.instance.user.id)

        if qs.count():
            raise validators.ValidationError("A user with this email already exists.")

        return value

    def validate_company(self, value):
        employee = self.context["request"].user.employee
        if value != employee.company:
            raise validators.ValidationError("Invalid company field.")
        return value

    def validate_manager(self, value):
        if not value:
            return value

        employee = self.context["request"].user.employee

        if value.company != employee.company:
            raise validators.ValidationError("Invalid manager field.")

        return value

    def validate_is_owner(self, value):
        employee = self.context["request"].user.employee

        if not employee.is_owner:
            raise validators.ValidationError(
                "Only admin employees can include is_owner field."
            )

        if employee == self.instance:
            raise validators.ValidationError(
                "An owner employee cannot include is_owner field for themselves."
            )

        return value

    def validate_is_admin(self, value):
        employee = self.context["request"].user.employee

        if not employee.is_owner:
            raise validators.ValidationError(
                "Only admin employees can include is_admin field."
            )

        return value

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        employee = Employee.objects.create_with_user(
            user_data=user_data, **validated_data
        )
        return employee

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user")
        user_serializer = EmployeeUserSerializer(instance.user, data=user_data)
        user_serializer.update(instance.user, user_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

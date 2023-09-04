from rest_framework import serializers
from api.models import Employee, Company, CustomUser, Employment
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
from django.utils.crypto import get_random_string
from django.core.mail import send_mail


class CreateCompanyOwnerSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a company owner.
    """

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
        required=False,
        label="First Name",
    )
    last_name = serializers.CharField(
        source="user.last_name",
        required=False,
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


class ManageeEmployeeSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer for managee employees.
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
            "active_job_role": (JobRoleSerializer, {"expand": ["department"]}),
        }


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
    managees = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    employments = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    reset_password = serializers.BooleanField(write_only=True, default=False)

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
            "managees",
            "employments",
            "reset_password",
            "is_permanent",
            "contract_start_date",
            "contract_end_date",
        ]
        expandable_fields = {
            "company": CompanySerializer,
            "manager": ("api.EmployeeSerializer", {"expand": ["active_job_role"]}),
            "active_job_role": (JobRoleSerializer, {"expand": ["department"]}),
            "managees": (
                ManageeEmployeeSerializer,
                {
                    "many": True,
                    "expand": ["active_job_role"],
                },
            ),
            "employments": (
                EmploymentSerializer,
                {
                    "many": True,
                    "expand": ["job_role"],
                },
            ),
        }

    def validate_user(self, value):
        email = value.get("email", None)

        if email:
            qs = CustomUser.objects.filter(email=email)
            if self.instance:
                qs = qs.exclude(pk=self.instance.user.id)

            if qs.count():
                raise validators.ValidationError(
                    "A user with this email already exists."
                )

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

    def validate_reset_password(self, value):
        if not self.instance and value:
            raise validators.ValidationError(
                "reset_password field can only be used while updating."
            )
        return value

    def __reset_password(self, user):
        password = get_random_string(16)
        user.set_password(password)
        user.save()

        send_mail(
            "Password Reset.",
            f"New Password: {password}",
            "noreply@hrxcelerate.com",
            [user.email],
            fail_silently=True,
        )

    def create(self, validated_data):
        validated_data.pop("reset_password", None)

        user_data = validated_data.pop("user")
        employee = Employee.objects.create_with_user(
            user_data=user_data, **validated_data
        )

        self.__reset_password(employee.user)

        return employee

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", None)
        if user_data:
            user_serializer = EmployeeUserSerializer(instance.user, data=user_data)
            user_serializer.update(instance.user, user_data)

        reset_password = validated_data.pop("reset_password", None)
        if reset_password:
            self.__reset_password(instance.user)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class PermanentEmployeeSerializer(
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
    managees = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    employments = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    reset_password = serializers.BooleanField(write_only=True, default=False)

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
            "managees",
            "employments",
            "reset_password",
            "is_permanent",
        ]
        expandable_fields = {
            "company": CompanySerializer,
            "manager": ("api.EmployeeSerializer", {"expand": ["active_job_role"]}),
            "active_job_role": (JobRoleSerializer, {"expand": ["department"]}),
            "managees": (
                ManageeEmployeeSerializer,
                {
                    "many": True,
                    "expand": ["active_job_role"],
                },
            ),
            "employments": (
                EmploymentSerializer,
                {
                    "many": True,
                    "expand": ["job_role"],
                },
            ),
        }

    def validate_user(self, value):
        email = value.get("email", None)

        if email:
            qs = CustomUser.objects.filter(email=email)
            if self.instance:
                qs = qs.exclude(pk=self.instance.user.id)

            if qs.count():
                raise validators.ValidationError(
                    "A user with this email already exists."
                )

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

    def validate_reset_password(self, value):
        if not self.instance and value:
            raise validators.ValidationError(
                "reset_password field can only be used while updating."
            )
        return value

    def __reset_password(self, user):
        password = get_random_string(16)
        user.set_password(password)
        user.save()

        send_mail(
            "Password Reset.",
            f"New Password: {password}",
            "noreply@hrxcelerate.com",
            [user.email],
            fail_silently=True,
        )

    def create(self, validated_data):
        validated_data.pop("reset_password", None)

        user_data = validated_data.pop("user")
        employee = Employee.objects.create_with_user(
            user_data=user_data, **validated_data
        )

        self.__reset_password(employee.user)

        return employee

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", None)
        if user_data:
            user_serializer = EmployeeUserSerializer(instance.user, data=user_data)
            user_serializer.update(instance.user, user_data)

        reset_password = validated_data.pop("reset_password", None)
        if reset_password:
            self.__reset_password(instance.user)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

from rest_framework import serializers
from api.models import Employee, Company, CustomUser
from api.serializers import CustomUserSerializer, CompanySerializer
from django.conf import settings
from rest_framework import validators
from django.contrib.auth.password_validation import validate_password
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


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


class EmployeeSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

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
        ]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_serializer = CustomUserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.create(validated_data=user_data)

        employee = Employee.objects.create(user=user, **validated_data)
        return employee

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user")
        user_serializer = CustomUserSerializer(instance.user, data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.update(instance.user, user_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    #     def validate_company(self, company):
    #         print("in validate company")
    #         user_company = self.context["request"].user.employee.company
    #         print(company, user_company)
    #         if company != user_company:
    #             raise validators.ValidationError("Invalid company field.")
    #         return company
    #
    #     def validate_manager(self, manager):
    #         print("in validate manager")
    #         if not manager:
    #             return manager
    #         user_company = self.context["request"].user.employee.company
    #         print(manager.company, user_company)
    #         if manager.company != user_company:
    #             raise validators.ValidationError("Invalid manager field.")
    #         return manager
    #
    #     # def validate_email(self, value):
    #     #     print("in validate email")
    #     #     # Only validate if the email has changed
    #     #     if self.instance.user.email != value:
    #     #         if (
    #     #             Employee.objects.exclude(id=self.instance.id)
    #     #             .filter(user__email=value)
    #     #             .exists()
    #     #         ):
    #     #             raise serializers.ValidationError("This email is already in use.")
    #     #     return value


#     def create(self, validated_data):
#         print("in create")
#         print(validated_data)
#
#         user_data = validated_data.pop("user")
#         employee = Employee.objects.create_with_user(
#             user_data=user_data, **validated_data
#         )
#         return employee
#
#     def update(self, employee, validated_data):
#         print("in update")
#         print(validated_data)
#
#         user = employee.user
#         user_data = validated_data.pop("user")
#
#         print(user_data)
#
#         return super().update(employee, validated_data)

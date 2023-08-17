from django.contrib.auth import get_user_model
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

CustomUser = get_user_model()


class CustomUserSerializer(
    FlexFieldsSerializerMixin,
    serializers.ModelSerializer,
):
    """
    Serializer class for CustomUser model.
    """

    class Meta:
        model = CustomUser
        fields = ["id", "email"]


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for changing user password.
    """

    old_password = serializers.CharField(
        max_length=128,
        required=True,
        label="Old Password",
    )
    new_password = serializers.CharField(
        max_length=128,
        required=True,
        label="New Password",
    )

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Wrong password.")
        return value

    def validate_new_password(self, value):
        validate_password(value)
        return value

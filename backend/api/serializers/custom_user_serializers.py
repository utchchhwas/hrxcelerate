from django.contrib.auth import get_user_model
from rest_flex_fields.serializers import FlexFieldsSerializerMixin
from rest_framework import serializers

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
        fields = [
            "id",
            "email",
        ]
        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": True,
            },
        }

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password:
            instance.set_password(password)
            instance.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

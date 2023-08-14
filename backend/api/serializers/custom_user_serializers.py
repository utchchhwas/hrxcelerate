from rest_framework import serializers
from api.models import CustomUser
from rest_flex_fields.serializers import FlexFieldsSerializerMixin


class CustomUserSerializer(FlexFieldsSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "password", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True, "required": False}}

    def create(self, validated_data):
        print("In create of CustomUserSerializer")
        user = CustomUser.objects.create_user(**validated_data)
        return user

    #     def update(self, instance, validated_data):
    #         print("In update of CustomUserSerializer")
    #         password = validated_data.pop("password", None)
    #
    #         if password:
    #             instance.set_password(password)
    #             instance.save()
    #
    #         for attr, value in validated_data.items():
    #             setattr(instance, attr, value)
    #         instance.save()
    #
    #         return instance

    def update(self, instance, validated_data):
        # Handle password updates securely
        password = validated_data.pop("password", None)

        if password:
            instance.set_password(password)
            instance.save()

        # Check if the email is being changed
        new_email = validated_data.get("email")
        if new_email and new_email != instance.email:
            if (
                CustomUser.objects.exclude(id=instance.id)
                .filter(email=new_email)
                .exists()
            ):
                raise serializers.ValidationError("This email is already in use.")

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

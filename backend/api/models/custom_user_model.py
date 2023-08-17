from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    """
    A custom user manager for creating regular users and superusers
    with email as primary identification.
    """

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError("User must have an email.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """
    Custom user model wtih email as primary identifier.
    """

    # Make email unique
    email = models.EmailField(
        "Email Address",
        unique=True,
        error_messages={
            "unique": "A user with this email already exists.",
        },
    )
    # Remove unnecessary fields
    username = None
    first_name = None
    last_name = None

    # Set custom user manager
    objects = CustomUserManager()

    USERNAME_FIELD = "email"  # Field used for identification
    REQUIRED_FIELDS = []  # Have to remove email from required fields

    def __str__(self):
        return self.email

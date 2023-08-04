from django.contrib.auth.models import (
    BaseUserManager,
    AbstractUser,
)
from django.db import models


class MyUserManager(BaseUserManager):
    """
    Custom User Manager.
    """

    def create_user(self, email, username, password):
        """
        Create a new user with email as primary identifier.
        """

        if not email:
            raise ValueError("User must have an email.")

        if not password:
            raise ValueError("User must have a password.")

        user = self.model(email=self.normalize_email(email), username=username)

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        """
        Create a new user with superuser privileges.
        """

        user = self.create_user(email, username, password)

        user.is_staff = True  # Make accessible from Django Admin
        user.is_superuser = True  # Grant all permission in Django Admin

        user.save(using=self._db)

        return user


class MyUser(AbstractUser):
    """
    Custom User Model.
    """

    email = models.EmailField("email address", unique=True)
    username = None  # Remove username field

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

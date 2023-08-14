from typing import Any, Iterable, Optional
from django.db import models
from django.conf import settings
from api.models import CustomUser, Company
from django.dispatch import receiver
from django.db.models.signals import post_delete


class EmployeeManager(models.Manager):
    def create_with_user(self, user_data, **kwargs):
        print("in create with user")
        print(user_data, kwargs)
        user = CustomUser.objects.create_user(**user_data)
        return super().create(user=user, **kwargs)


class Employee(models.Model):
    """
    Model representing an employee of a company.
    """

    # An employee has a one-to-one relationship with a user.
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="employee",
        on_delete=models.CASCADE,
        verbose_name="User",
        blank=True,
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        verbose_name="Company",
        blank=True,
    )
    manager = models.ForeignKey(
        "Employee",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Manager",
    )
    is_owner = models.BooleanField(
        "Owner",
        default=False,
    )
    is_admin = models.BooleanField(
        "Admin",
        default=False,
    )
    is_active = models.BooleanField(
        "Active",
        default=True,
    )
    gender = models.CharField(
        "Gender",
        max_length=1,
        choices=[
            ("M", "Male"),
            ("F", "Female"),
            ("O", "Other"),
        ],
        blank=True,
    )
    date_of_birth = models.DateField(
        "Date of Birth",
        null=True,
        blank=True,
    )

    objects = EmployeeManager()

    class Meta:
        pass

    # def __str__(self):
    #     return f"{self.user.email}"


@receiver(post_delete, sender=Employee)
def post_delete_user(sender, instance, *args, **kwargs):
    """
    Signal for deleting corresponding User when an Employee is deleted.
    """
    instance.user.delete()

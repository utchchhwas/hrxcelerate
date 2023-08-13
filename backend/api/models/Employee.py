from django.db import models
from django.conf import settings
from api.models import Company
from django.dispatch import receiver
from django.db.models.signals import post_delete


class EmployeeManager(models.Manager):
    pass


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
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        verbose_name="Company",
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

    class Meta:
        pass

    def __str__(self):
        return f"{self.user.email}"


@receiver(post_delete, sender=Employee)
def post_delete_user(sender, instance, *args, **kwargs):
    instance.user.delete()

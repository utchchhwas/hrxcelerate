from django.db import models
from django.conf import settings
from . import Company


class Employee(models.Model):
    """
    Model representing an employee of a company.
    """

    # An employee has a one-to-one relationship with a user.
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Employee"
    )
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, verbose_name="Company"
    )
    manager = models.ForeignKey(
        "Employee", on_delete=models.SET_NULL, null=True, verbose_name="Manager"
    )
    is_admin = models.BooleanField("Is Admin", default=False)
    is_active = models.BooleanField("Is Active", default=True)
    gender = models.CharField(
        "Gender",
        max_length=1,
        choices=[
            ("M", "Male"),
            ("F", "Female"),
            ("O", "Other"),
        ],
    )
    date_of_birth = models.DateField("Date of Birth")

    class Meta:
        pass

    def __str__(self):
        return self.user.email

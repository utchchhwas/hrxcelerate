from django.db import models
from api.models import Employee


class Tracking(models.Model):
    """
    Model representing tracking history of an employee.
    """

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )
    start_time = models.DateTimeField(
        "Tracking Start Time",
        null=True,
        blank=True,
    )
    end_time = models.DateTimeField(
        "Tracking End Time",
        null=True,
        blank=True,
    )
    note = models.TextField(
        "Tracking Note",
        max_length=1000,
        blank=True,
    )

    class Meta:
        pass

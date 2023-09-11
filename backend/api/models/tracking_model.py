from django.db import models
from api.models import Employee


class Tracking(models.Model):
    """
    Model representing tracking history of an employee.
    """

    employee = models.ForeignKey(
        Employee,
        related_name="trackings",
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
    is_active = models.BooleanField(
        "Active",
        default=True,
    )

    class Meta:
        pass

    def __str__(self):
        return f"{self.employee} - {self.id}"

from django.db import models
from api.models import Employee


class TimeOff(models.Model):
    """
    Model representing time-off entry of an employee.
    """

    employee = models.ForeignKey(
        Employee,
        related_name="time_offs",
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )
    start_time = models.DateTimeField(
        "Time-Off Start Time",
        null=True,
        blank=True,
    )
    end_time = models.DateTimeField(
        "Time-Off End Time",
        null=True,
        blank=True,
    )
    status = models.CharField(
        "Time-Off Status",
        max_length=1,
        choices=[
            ("P", "Pending"),
            ("A", "Accepted"),
            ("R", "Rejected"),
        ],
        default="P",
    )

    class Meta:
        verbose_name_plural = "Time-Offs"

    def __str__(self):
        return f"{self.employee} - {self.id}"

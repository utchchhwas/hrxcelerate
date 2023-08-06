from django.db import models
from api.models import Employee


class Notification(models.Model):
    """
    Model representing a notification for an employee.
    """

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )
    time = models.DateTimeField(
        "Notification Time",
        null=True,
        blank=True,
    )
    message = models.TextField(
        "Notification Message",
        max_length=1000,
        blank=True,
    )

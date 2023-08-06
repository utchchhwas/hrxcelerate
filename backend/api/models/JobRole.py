from django.db import models
from . import Department


class JobRole(models.Model):
    """
    Model representing a job role in a company under a department.
    """

    name = models.CharField(
        "Job Role Name",
        max_length=150,
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        verbose_name="Department",
    )
    description = models.TextField(
        "Job Role Description",
        max_length=500,
        blank=True,
    )

    class Meta:
        pass

    def __str__(self):
        return self.name

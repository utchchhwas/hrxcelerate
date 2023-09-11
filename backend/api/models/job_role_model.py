from django.db import models
from api.models import Department


class JobRole(models.Model):
    """
    Model representing a job role in some department.
    """

    department = models.ForeignKey(
        Department,
        related_name="job_roles",
        on_delete=models.CASCADE,
        verbose_name="Department",
    )
    name = models.CharField(
        "Job Role Name",
        max_length=150,
    )
    description = models.TextField(
        "Job Role Description",
        max_length=5000,
        blank=True,
    )

    class Meta:
        verbose_name = "Job Role"

    def __str__(self):
        return f"{self.name} - {self.department.name} - {self.department.company.name}"

from django.db import models
from api.models import Company


class Department(models.Model):
    """
    Model representing a department in a company.
    """

    company = models.ForeignKey(
        Company,
        related_name="departments",
        
        on_delete=models.CASCADE,
        verbose_name="Company",
    )
    name = models.CharField(
        "Department Name",
        max_length=100,
    )
    description = models.TextField(
        "Department Description",
        max_length=5000,
        blank=True,
    )

    class Meta:
        pass

    def __str__(self):
        return f"{self.name} - {self.company.name}"

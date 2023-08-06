from django.db import models
from . import Company


class Department(models.Model):
    """
    Model representing a department in a company.
    """

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        verbose_name="Company",
    )
    name = models.CharField(
        "Department Name",
        max_length=150,
    )
    description = models.TextField(
        "Department Description",
        max_length=1000,
        blank=True,
    )

    class Meta:
        pass

    def __str__(self):
        return self.name

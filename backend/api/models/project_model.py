from django.db import models
from djmoney.models.fields import MoneyField


class Project(models.Model):
    """
    Model representing project. Project and Employee have many-to-many relationship.
    """

    name = models.CharField(
        max_length=50,
        unique=True,
        )
    
    company = models.ForeignKey(
        "api.Company",
        related_name="projects",
        on_delete=models.CASCADE,
        verbose_name="Company",
        null=True,
        blank=True,
    )

    manager = models.ForeignKey(
        "api.Employee",
        related_name="projects",
        on_delete=models.CASCADE,
        verbose_name="Manager",
        null=True,
        blank=True,
    )

    start_date = models.DateField(
        "Start Date",
        null=True,
        blank=True,
    )

    end_date = models.DateField(
        "End Date",
        null=True,
        blank=True,
    )

    budget = MoneyField(
        "Budget",
        max_digits=19,
        decimal_places=4,
        default_currency=None,
        null=True,
        blank=True,
    )


    
    class Meta:
        pass
        # unique_together = ("company", "name")

    def __str__(self):
        return f"{self.name} - {self.company.name}"
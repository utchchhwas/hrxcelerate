from django.db import models
from api.models import Employee


class Payslip(models.Model):
    """
    Model representing payslip of an employee.
    """

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )
    from_date = models.DateField(
        "Payslip From Date",
        null=True,
        blank=True,
    )
    from_date = models.DateField(
        "Payslip To Date",
        null=True,
        blank=True,
    )
    amount = models.DecimalField(
        "Payslip Amount",
        max_digits=19,
        decimal_places=10,
        blank=True,
    )

    class Meta:
        pass

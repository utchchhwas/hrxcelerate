from django.db import models
from . import Employee, JobRole
from djmoney.models.fields import MoneyField


class Employment(models.Model):
    """
    Model representing an employment of an employee in a company.
    """

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )
    job_role = models.ForeignKey(
        JobRole,
        on_delete=models.CASCADE,
        verbose_name="Job Role",
    )
    is_active = models.BooleanField(
        "Active",
        default=True,
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
    employment_type = models.CharField(
        "Employment Type",
        max_length=2,
        choices=[
            ("FT", "Full-Time"),
            ("PT", "Part-Time"),
            ("IS", "Internship"),
        ],
        blank=True,
    )
    is_remote = models.BooleanField(
        "Remote",
        default=False,
    )
    note = models.CharField(
        "Employment Note",
        max_length=150,
        blank=True,
    )

    class Meta:
        pass

    def __str__(self):
        return f"{self.employee.user.get_full_name()} - {self.job_role.name}"

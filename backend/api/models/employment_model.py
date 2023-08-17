from django.db import models
from djmoney.models.fields import MoneyField


class Employment(models.Model):
    """
    Model representing many-to-many relationship between employees and job roles.
    """

    employee = models.ForeignKey(
        "api.Employee",
        related_name="employments",
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )
    job_role = models.ForeignKey(
        "api.JobRole",
        related_name="employments",
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
    salary = MoneyField(
        "salary",
        max_digits=19,
        decimal_places=4,
        default_currency=None,
        null=True,
        blank=True,
    )
    salary_frequency = models.CharField(
        "Salary Frequency",
        choices=[
            ("H", "Hourly"),
            ("D", "Daily"),
            ("W", "Weekly"),
            ("B", "Bi-weekly"),
            ("M", "Monthly"),
        ],
        max_length=1,
        blank=True,
    )
    note = models.CharField(
        "Employment Note",
        max_length=500,
        blank=True,
    )

    class Meta:
        pass

    def __str__(self):
        return f"{self.employee.user.email} - {self.job_role}"

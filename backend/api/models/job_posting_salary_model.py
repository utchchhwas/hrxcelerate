from django.db import models
from djmoney.models.fields import MoneyField
from api.models import JobPosting


class JobPostingSalary(models.Model):
    """
    Model representing the salary information of a job posting.
    """

    job_posting = models.OneToOneField(
        JobPosting,
        related_name="job_posting_salary",
        primary_key=True,
        on_delete=models.CASCADE,
        verbose_name="Job Posting",
    )
    minimum_salary = MoneyField(
        "Minimum Salary",
        max_digits=19,
        decimal_places=4,
        default_currency=None,
        null=True,
        blank=True,
    )
    maximum_salary = MoneyField(
        "Maximum Salary",
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

    class Meta:
        verbose_name_plural = "Job Posting Salaries"

    def __str__(self):
        return f"{self.job_posting}"

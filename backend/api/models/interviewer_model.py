from django.db import models


class Interviewer(models.Model):
    """
    Interviewer ralationship between employee and job posting.
    """

    job_posting = models.ForeignKey(
        "api.JobPosting",
        related_name="interviewers",
        on_delete=models.CASCADE,
        verbose_name="Job Posting",
    )
    employee = models.ForeignKey(
        "api.Employee",
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )

    class Meta:
        unique_together = ("job_posting", "employee")

    def __str__(self):
        return f"{self.employee.user.email} - {self.job_posting}"

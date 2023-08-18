from django.db import models


class Interview(models.Model):
    """
    Interview ralationship between employee and job posting.
    """

    job_posting = models.ForeignKey(
        "api.JobPosting",
        related_name="interviews",
        on_delete=models.CASCADE,
        verbose_name="Job Posting",
    )
    employee = models.ForeignKey(
        "api.Employee",
        related_name="interviews",
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )

    class Meta:
        pass

    def __str__(self):
        return f"{self.employee.email} - {self.job_posting}"

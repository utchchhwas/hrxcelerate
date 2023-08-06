from django.db import models
from api.models import JobPosting, Employee


class Interviewer(models.Model):
    """
    Model representing an interviewer assigned to a job posting.
    """

    job_posting = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        verbose_name="Job Posting",
    )
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        verbose_name="Employee",
    )

    class Meta:
        pass

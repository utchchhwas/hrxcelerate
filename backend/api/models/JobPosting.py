from django.db import models
from api.models import JobRole


class JobPosting(models.Model):
    """
    Model representing a job posting in a company.
    """

    job_role = models.ForeignKey(
        JobRole,
        on_delete=models.CASCADE,
        verbose_name="Job Role",
    )
    tags = models.TextField(
        "Job Posting Tags",
        max_length=500,
        blank=True,
    )
    description = models.TextField(
        "Job Posting Description",
        blank=True,
    )

    class Meta:
        pass

    def __str__(self):
        return self.job_role.name

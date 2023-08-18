from django.db import models
from api.models import JobRole


class JobPosting(models.Model):
    """
    Model representing a job posting in a company.
    """

    job_role = models.ForeignKey(
        JobRole,
        related_name="job_postings",
        on_delete=models.CASCADE,
        verbose_name="Job Role",
    )
    tags = models.TextField(
        "Job Posting Tags",
        max_length=1000,
        blank=True,
    )
    description = models.TextField(
        "Job Posting Description",
        blank=True,
    )
    is_active = models.BooleanField(
        "Active",
        default=True,
    )

    class Meta:
        verbose_name_plural = "Job Postings"

    def __str__(self):
        return f"{self.job_role.name} - {self.id}"

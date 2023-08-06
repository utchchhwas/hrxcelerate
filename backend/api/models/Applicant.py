from django.db import models
from api.models import JobPosting


class Applicant(models.Model):
    """
    Model representing an applicant who applied for a job posting.
    """

    job_posting = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        verbose_name="Job Posting",
    )
    first_name = models.CharField("First Name", max_length=150, blank=True)
    last_name = models.CharField("First Name", max_length=150, blank=True)
    email = models.EmailField("Email", blank=True)
    status = models.CharField(
        "Status",
        max_length=1,
        choices=[
            ("A", "Applied"),
            ("Q", "Qualified"),
            ("I", "Interviewing"),
            ("S", "Short-listed"),
            ("O", "Offered"),
            ("H", "Hired"),
            ("R", "Rejected"),
        ],
        blank=True,
    )

    class Meta:
        pass

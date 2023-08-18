from django.db import models
from api.models import JobPosting
from uuid import uuid4
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django.utils import timezone


def applicant_resume_upload_to(instance, filename):
    """
    Get uploading file path for applicant resume.
    """
    return f"hrx-resumes/{uuid4().hex}.pdf"


class Applicant(models.Model):
    """
    Model representing an applicant applying for a job posting.
    """

    job_posting = models.ForeignKey(
        JobPosting,
        related_name="applicants",
        on_delete=models.CASCADE,
        verbose_name="Job Posting",
    )
    email = models.EmailField(
        "Email",
    )
    first_name = models.CharField(
        "First Name",
        max_length=150,
        blank=True,
    )
    last_name = models.CharField(
        "First Name",
        max_length=150,
        blank=True,
    )
    resume = models.FileField(
        "Resume",
        upload_to=applicant_resume_upload_to,
        storage=RawMediaCloudinaryStorage(),
        blank=True,
    )
    applied_at = models.DateTimeField(
        "Applied At",
        default=timezone.now,
        editable=False,
    )
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
            ("D", "Denied"),
        ],
        default="A",
        blank=True,
    )

    class Meta:
        pass

    def __str__(self):
        return f"{self.email} - {self.id}"

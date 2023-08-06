from django.db import models
from api.models import JobPosting


class JobPostingSalary(models.Model):
    """
    Model representing the salary information of a job posting.
    """

    job_posting = models.OneToOneField(
        JobPosting,
        on_delete=models.CASCADE,
        verbose_name="Job Posting",
    )

    class Meta:
        pass

    def __str__(self):
        return self.job_posting.job_role.name

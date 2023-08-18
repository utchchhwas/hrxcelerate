from django.db import models
from api.models import Applicant, Interview


class InterviewResult(models.Model):
    """
    Model representing interview result of an applicant.
    """

    applicant = models.ForeignKey(
        Applicant,
        on_delete=models.CASCADE,
        verbose_name="Applicant",
    )
    interviewer = models.ForeignKey(
        Interview,
        on_delete=models.CASCADE,
        verbose_name="Interviewer",
    )
    score = models.FloatField(
        "Interview Score",
        blank=True,
    )
    note = models.TextField(
        "Interview Note",
        max_length=5000,
        blank=True,
    )

    class Meta:
        pass

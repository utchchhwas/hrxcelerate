from django.db import models


class InterviewResult(models.Model):
    """
    Interview result relationship between interviewer and applicant.
    """

    applicant = models.ForeignKey(
        "api.Applicant",
        related_name="interview_results",
        on_delete=models.CASCADE,
        verbose_name="Applicant",
    )
    interviewer = models.ForeignKey(
        "api.Interviewer",
        related_name="interview_results",
        on_delete=models.CASCADE,
        verbose_name="Interviewer",
    )
    score = models.FloatField(
        "Interview Score",
        blank=True,
        null=True,
    )
    note = models.TextField(
        "Interview Note",
        max_length=5000,
        blank=True,
    )

    class Meta:
        unique_together = ("applicant", "interviewer")

    def __str__(self):
        return f"{self.applicant} - {self.interviewer}"

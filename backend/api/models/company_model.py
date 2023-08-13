from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage
from uuid import uuid4


def company_logo_upload_to(instance, filename):
    return f"hrx-logos/{uuid4().hex}"


class Company(models.Model):
    """
    Model representing a company.
    """

    name = models.CharField(
        "Company Name",
        max_length=100,
    )
    motto = models.CharField(
        "Company Motto",
        max_length=1000,
        blank=True,
    )
    description = models.TextField(
        "Company Description",
        blank=True,
    )
    website = models.CharField(
        "Company Website",
        max_length=100,
        blank=True,
    )
    address = models.TextField(
        "Company Address",
        blank=True,
    )
    logo = models.ImageField(
        "Company Logo",
        upload_to=company_logo_upload_to,
        storage=MediaCloudinaryStorage(),
        blank=True,
    )

    class Meta:
        verbose_name_plural = "companies"

    def __str__(self):
        return self.name

    def get_company(self):
        return self

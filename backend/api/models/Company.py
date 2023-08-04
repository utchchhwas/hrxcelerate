from django.db import models


class Company(models.Model):
    """
    Model representing a company.
    """

    name = models.CharField("Company Name", max_length=150)
    motto = models.CharField("Company Motto", max_length=250, blank=True)
    description = models.TextField("Company Description", max_length=5000, blank=True)
    website = models.URLField("Company Website", blank=True)
    hq_address = models.CharField("Company HQ Address", max_length=500, blank=True)

    class Meta:
        verbose_name_plural = "companies"

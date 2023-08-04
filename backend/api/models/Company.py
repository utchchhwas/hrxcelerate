from django.db import models
from django_countries.fields import CountryField


class Company(models.Model):
    """
    Model representing a company.
    """

    name = models.CharField("Company Name", max_length=150)
    motto = models.CharField("Company Motto", max_length=250, blank=True)
    description = models.TextField("Company Description", max_length=5000, blank=True)
    website = models.URLField("Company Website", blank=True)
    country = CountryField(null=True, blank=True)
    hq_address = models.TextField("Company HQ Address", max_length=500, blank=True)

    class Meta:
        verbose_name_plural = "companies"

    def __str__(self):
        return self.name

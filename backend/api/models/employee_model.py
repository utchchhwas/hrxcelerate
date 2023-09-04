from django.db import models
from django.conf import settings
from api.models import CustomUser, Company, JobRole, Employment
from django.dispatch import receiver
from django.db.models.signals import post_delete
from cloudinary_storage.storage import MediaCloudinaryStorage
from uuid import uuid4


def employee_avatar_upload_to(instance, filename):
    """
    Get uploading file path for company logo.
    """
    return f"hrx-avatars/{uuid4().hex}"


class EmployeeManager(models.Manager):
    """
    Custom manager for Employee model.
    """

    def create_with_user(self, user_data, **kwargs):
        user = CustomUser.objects.create_user(**user_data)
        return super().create(user=user, **kwargs)


class Employee(models.Model):
    """
    Model representing an employee of a company.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="employee",
        primary_key=True,
        on_delete=models.CASCADE,
        verbose_name="User",
    )
    company = models.ForeignKey(
        Company,
        related_name="employees",
        on_delete=models.CASCADE,
        verbose_name="Company",
    )
    manager = models.ForeignKey(
        "Employee",
        related_name="managees",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Manager",
    )
    is_owner = models.BooleanField(
        "Owner",
        default=False,
    )
    is_admin = models.BooleanField(
        "Admin",
        default=False,
    )
    is_active = models.BooleanField(
        "Active",
        default=True,
    )
    gender = models.CharField(
        "Gender",
        max_length=1,
        choices=[
            ("M", "Male"),
            ("F", "Female"),
            ("O", "Other"),
        ],
        blank=True,
    )
    date_of_birth = models.DateField(
        "Date of Birth",
        null=True,
        blank=True,
    )
    avatar = models.ImageField(
        "Avatar",
        upload_to=employee_avatar_upload_to,
        storage=MediaCloudinaryStorage(),
        blank=True,
    )
    job_roles = models.ManyToManyField(
        JobRole,
        related_name="employees",
        through=Employment,
        verbose_name="Job Roles",
    )
    is_permanent = models.BooleanField(
        "Permanent",
        default=True,
    )
    contract_start_date = models.DateField(
        "Start Date",
        null=True,
        blank=True,
    )
    contract_end_date = models.DateField(
        "End Date",
        null=True,
        blank=True,
    )

    objects = EmployeeManager()

    class Meta:
        pass

    @property
    def active_job_role(self):
        active_employments = self.employments.filter(is_active=True)
        if active_employments.exists():
            return active_employments.order_by("-start_date").first().job_role
        return None

    def __str__(self):
        return f"{self.user.email} - {self.company.name}"


@receiver(post_delete, sender=Employee)
def post_delete_user(sender, instance, *args, **kwargs):
    """
    Signal for deleting corresponding User when an Employee is deleted.
    """
    instance.user.delete()

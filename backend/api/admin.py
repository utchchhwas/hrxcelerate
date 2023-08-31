from api.models import *
from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group


admin.site.unregister(Group)


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """
    Custom User Admin for Custom User.
    """

    fieldsets = (
        (None, {"fields": ("email", "password", "first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "password1", "password2")}),
    )
    list_display = ("email", "id")
    search_fields = ("email",)
    ordering = ("id",)
    filter_horizontal = ()


@admin.register(Company)
class CompanyAdmin(ModelAdmin):
    list_display = ("name", "id")
    ordering = ("name",)


@admin.register(Department)
class DepartmentAdmin(ModelAdmin):
    list_display = ("name", "company", "id")
    ordering = ("name",)


@admin.register(JobRole)
class JobRoleAdmin(ModelAdmin):
    list_display = ("name", "department", "id")
    ordering = ("name",)


@admin.register(Employee)
class EmployeeAdmin(ModelAdmin):
    list_display = ("user", "company")
    ordering = ("user", "company")


@admin.register(Employment)
class EmploymentAdmin(ModelAdmin):
    list_display = ("__str__", "employee", "job_role", "id")


@admin.register(JobPosting)
class JobPostingAdmin(ModelAdmin):
    list_display = ("__str__", "job_role", "id")
    ordering = ("id",)


@admin.register(Applicant)
class ApplicantAdmin(ModelAdmin):
    list_display = ("email", "job_posting", "id")
    ordering = ("email", "job_posting", "id")


@admin.register(Interviewer)
class InterviewerAdmin(ModelAdmin):
    list_display = ("employee", "job_posting", "id")
    ordering = ("employee", "job_posting", "id")


@admin.register(InterviewResult)
class InterviewResultAdmin(ModelAdmin):
    list_display = ("applicant", "interviewer", "id")
    ordering = ("applicant", "interviewer", "id")


# admin.site.register(Payslip)
# admin.site.register(TimeOff)
# admin.site.register(Tracking)

from api.models import *
from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """
    Custom User Admin for Custom User.
    """

    fieldsets = (
        (None, {"fields": ("email", "password")}),
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
    ordering = ("id",)


@admin.register(Employee)
class EmployeeModel(ModelAdmin):
    pass


#
# @admin.register(Department)
# class DepartmentModel(ModelAdmin):
#     pass
#
#
# @admin.register(JobRole)
# class JobRole(ModelAdmin):
#     pass


# admin.site.register(Applicant)
# admin.site.register(Employment)
# admin.site.register(Interviewer)
# admin.site.register(InterviewResult)
# admin.site.register(JobPosting)
# admin.site.register(JobPostingSalary)
# admin.site.register(Notification)
# admin.site.register(Payslip)
# admin.site.register(TimeOff)
# admin.site.register(Tracking)

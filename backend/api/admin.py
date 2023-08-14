from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin
from api.models import *


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """
    Custom User Admin.
    """

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
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
    list_display = ("user", "company")


@admin.register(Department)
class DepartmentModel(ModelAdmin):
    pass


admin.site.register(Applicant)
admin.site.register(Employment)
admin.site.register(Interviewer)
admin.site.register(InterviewResult)
admin.site.register(JobPosting)
admin.site.register(JobPostingSalary)
admin.site.register(JobRole)
admin.site.register(Notification)
admin.site.register(Payslip)
admin.site.register(TimeOff)
admin.site.register(Tracking)

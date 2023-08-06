from django.contrib import admin
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


admin.site.register(Applicant)
admin.site.register(Company)
admin.site.register(Department)
admin.site.register(Employee)
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

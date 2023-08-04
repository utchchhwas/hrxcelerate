from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    MyUser,
    Company,
    Employee,
    Department,
    JobRole,
    Employment,
)


class MyUserAdmin(UserAdmin):
    """
    Custom User Admin.
    """

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    list_display = ("email", "first_name", "last_name", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("first_name", "last_name", "email")
    ordering = ("email",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )


admin.site.register(MyUser, MyUserAdmin)

admin.site.register(Company)

admin.site.register(Employee)

admin.site.register(Department)

admin.site.register(JobRole)

admin.site.register(Employment)

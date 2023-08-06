from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsSafeMethod(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsCompanyAdmin(BasePermission):
    """
    Check if the user is an admin of his company.
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "employee") and request.user.employee.is_admin

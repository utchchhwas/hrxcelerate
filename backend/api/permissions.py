from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsReadOnly(BasePermission):
    """
    Check if the request is read-only i.e. safe.
    """

    message = "Request is not read-only."

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsAdminEmployee(BasePermission):
    """
    Check if the user is an admin employee.
    """

    message = "User is not an admin employee."

    def has_permission(self, request, view):
        return request.user.employee.is_admin


class IsCompanyObject(BasePermission):
    """
    Check if the object belongs to the user's company.
    """

    message = "Object does not belong to user's company."

    def has_object_permission(self, request, view, obj):
        return request.user.employee.company == obj.get_company()

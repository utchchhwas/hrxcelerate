from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class IsReadOnly(BasePermission):
    """
    Check if the request is read-only i.e. safe.
    """

    message = "Request is not read-only."

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsEmployee(BasePermission):
    """
    Check if the user in an employee.
    """

    message = "User is not an employee."

    def has_permission(self, request, view):
        return hasattr(request.user, "employee")


class IsOwnerEmployee(BasePermission):
    """
    Check if the user is an owner Employee of the company.
    """

    message = "User is not an owner employee."

    def has_permission(self, request, view):
        return hasattr(request.user, "employee") and request.user.employee.is_owner


class IsAdminEmployee(BasePermission):
    """
    Check if the user is an admin employee of the company.
    """

    message = "User is not an admin employee."

    def has_permission(self, request, view):
        return hasattr(request.user, "employee") and request.user.employee.is_admin


class IsCompanyObject(BasePermission):
    """
    Check if the object belongs to the user's company.
    """

    message = "Object does not belong to the company."

    def has_object_permission(self, request, view, obj):
        return request.user.employee.company == obj.get_company()


class CompanyPermissionMixin:
    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated(), IsEmployee()]
        return [IsAuthenticated(), IsAdminEmployee()]

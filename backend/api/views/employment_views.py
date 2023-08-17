from rest_framework import viewsets
from api.models import Employment
from api.serializers import EmploymentSerializer
from api.permissions import CompanyPermissionMixin


class EmploymentViewSet(
    CompanyPermissionMixin,
    viewsets.ModelViewSet,
):
    """ """

    serializer_class = EmploymentSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Employment.objects.none()
        company = user.employee.company
        return Employment.objects.filter(employee__company=company)

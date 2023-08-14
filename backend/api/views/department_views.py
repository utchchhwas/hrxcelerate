from rest_framework.viewsets import ModelViewSet
from api.models import Department
from api.serializers import DepartmentSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsAdminEmployee


class DepartmentViewSet(ModelViewSet):
    """ """

    serializer_class = DepartmentSerializer

    def get_queryset(self):
        """
        Only expose departments from the user's company.
        """
        company = self.request.user.employee.company
        return Department.objects.filter(company=company)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdminEmployee()]

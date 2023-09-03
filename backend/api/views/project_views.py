"""
Project views
    - ProjectViewSet
"""
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from api.serializers import ProjectSerializer
from api.models import Project
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS


class ProjectViewSet(viewsets.ModelViewSet):
    """
    Provides the following actions:
        - Create Project
        - Retrieve Project List
        - Retrieve Project
        - Update Project
        - Destroy Project
    """

    permission_classes = [IsAuthenticated, IsAdminEmployee]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "company",
        "manager",
        "start_date",
        "end_date",
    ]
    search_fields = [
        "name",
        "manager__user__email",
    ]
    ordering_fields = [
        "name",
        "manager",
        "start_date",
        "end_date",
    ]
    ordering = ["name"]

    serializer_class = ProjectSerializer

    def get_queryset(self):
        """
        This view should return a list of all the projects
        for the currently authenticated user.
        """
        user = self.request.user
        return Project.objects.filter(company=user.employee.company)
    
    # def get_permissions(self):
    #     if self.request.method in SAFE_METHODS:
    #         return [IsAuthenticated(), IsEmployee()]
    #     return [IsAuthenticated(), IsAdminEmployee()]
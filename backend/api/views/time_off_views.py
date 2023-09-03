from rest_framework.viewsets import ModelViewSet
from api.models import TimeOff
from api.serializers import TimeOffSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class TimeOffViewSet(ModelViewSet):
    """
    ViewSet for TimeOff.
    """

    permission_classes = [IsAuthenticated]

    serializer_class = TimeOffSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return TimeOff.objects.none()
        company = user.employee.company
        return TimeOff.objects.filter(employee__company=company)

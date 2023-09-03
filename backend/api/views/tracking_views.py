from rest_framework.viewsets import ModelViewSet
from api.models import Tracking
from api.serializers import TrackingSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsEmployee, IsAdminEmployee
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


class TrackingViewSet(ModelViewSet):
    """
    ViewSet for Tracking.
    """

    permission_classes = [IsAuthenticated]

    serializer_class = TrackingSerializer

    def get_queryset(self):
        user = self.request.user
        if not hasattr(user, "employee"):
            return Tracking.objects.none()
        company = user.employee.company
        return Tracking.objects.filter(employee__company=company)

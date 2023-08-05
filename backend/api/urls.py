from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import RetrieveUpdateCompanyView
from api.views import EmployeeViewSet

urlpatterns = [
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("company/", RetrieveUpdateCompanyView.as_view()),
]


employeeViewSetRouter = DefaultRouter()
employeeViewSetRouter.register(r"employee", EmployeeViewSet, basename="employee")

urlpatterns += employeeViewSetRouter.urls

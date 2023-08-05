from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import RetrieveUpdateCompanyView
from api.views import EmployeeViewSet
from api.views import DepartmentViewSet
from api.views import JobRoleViewSet

urlpatterns = [
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("company/", RetrieveUpdateCompanyView.as_view()),
]


router = DefaultRouter()
router.register(r"employee", EmployeeViewSet, basename="employee")
router.register(r"department", DepartmentViewSet, basename="department")
router.register(r"job-role", JobRoleViewSet, basename="job-role")

urlpatterns += router.urls

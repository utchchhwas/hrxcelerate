from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import ApplicantViewSet
from api.views import DepartmentViewSet
from api.views import EmployeeViewSet
from api.views import EmploymentViewSet
from api.views import InterviewerViewSet
from api.views import InterviewResultViewSet
from api.views import JobPostingViewSet
from api.views import JobPostingSalaryViewSet
from api.views import JobRoleViewSet
from api.views import NotificationViewSet
from api.views import PayslipViewSet
from api.views import TimeOffViewSet
from api.views import TrackingViewSet
from api.views import CompanyRetrieveUpdateDestroyViewSet


urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="obtain-token-pair"),
    path("refresh-token/", TokenRefreshView.as_view(), name="refresh-token"),
]


router = DefaultRouter()

router.register(r"companies", CompanyRetrieveUpdateDestroyViewSet, basename="company")
router.register(r"employees", EmployeeViewSet, basename="employee")


urlpatterns += router.urls

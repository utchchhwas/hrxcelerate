from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import ApplicantViewSet
from api.views import CustomUserViewSet
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
from api.views import CompanyRetrieveUpdateViewSet


urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="obtain-token-pair"),
    path("refresh-token/", TokenRefreshView.as_view(), name="refresh-token"),
]


# Registering viewsets for All models
router = SimpleRouter()
# router.register(r"applicants", ApplicantViewSet, basename="applicants")
# router.register(r"companies", CompanyViewSet, basename="companies")
# router.register(r"users", CustomUserViewSet, basename="users")
# router.register(r"departments", DepartmentViewSet, basename="departments")
# router.register(r"employees", EmployeeViewSet, basename="employees")
# router.register(r"employments", EmploymentViewSet, basename="employments")
# router.register(r"interviewers", InterviewerViewSet, basename="interviewers")
# router.register(
#     r"interview-results", InterviewResultViewSet, basename="interview-results"
# )
# router.register(r"job-postings", JobPostingViewSet, basename="job-postings")
# router.register(
#     r"job-posting-salaries", JobPostingSalaryViewSet, basename="job-posting-salaries"
# )
# router.register(r"job-roles", JobRoleViewSet, basename="job-roles")
# router.register(r"notifications", NotificationViewSet, basename="notifications")
# router.register(r"payslips", PayslipViewSet, basename="payslips")
# router.register(r"time-offs", TimeOffViewSet, basename="time-offs")
# router.register(r"trackings", TrackingViewSet, basename="trackings")

router.register(r"companies", CompanyRetrieveUpdateViewSet, basename="company")

urlpatterns += router.urls

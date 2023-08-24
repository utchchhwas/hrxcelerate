from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import PublicApplicantViewSet
from api.views import DepartmentViewSet
from api.views import EmploymentViewSet
from api.views import InterviewerViewSet
from api.views import InterviewResultViewSet
from api.views import JobPostingViewSet
from api.views import JobRoleViewSet
from api.views import NotificationViewSet
from api.views import PayslipViewSet
from api.views import TimeOffViewSet
from api.views import TrackingViewSet
from api.views import CustomUserViewSet
from api.views import RetrieveUpdateDestroyCompanyViewSet
from api.views import CreateCompanyOwnerView, EmployeeViewSet
from api.views import PublicJobPostingViewSet
from api.views import ChangePasswordView
from api.views import ApplicantViewSet
from api.views import InterviewerViewSet


urlpatterns = [
    # path("obtain-token-pair/", TokenObtainPairView.as_view(), name="obtain-token-pair"),
    # path("refresh-token/", TokenRefreshView.as_view(), name="refresh-token"),
    # path(
    #     "change-password/",
    #     ChangePasswordView.as_view(),
    #     name="change-password",
    # ),
    path(
        "create-company-owner/",
        CreateCompanyOwnerView.as_view(),
        name="create-company-owner",
    )
]


router = DefaultRouter()

# router.register(
#     r"create-company-owner", CreateCompanyOwnerView, basename="create-company-owner"
# )
# router.register(r"companies", RetrieveUpdateDestroyCompanyViewSet, basename="company")
# router.register(r"departments", DepartmentViewSet, basename="department")
# router.register(r"job-roles", JobRoleViewSet, basename="job-roles")
# router.register(r"employees", EmployeeViewSet, basename="employee")
# router.register(r"employments", EmploymentViewSet, basename="employments")
# router.register(r"job-postings", JobPostingViewSet, basename="job-postings")
# router.register(
#     r"public-job-postings", PublicJobPostingViewSet, basename="public-job-postings"
# )
# router.register(r"applicants", ApplicantViewSet, basename="applicants")
# router.register(
#     r"public-applicants", PublicApplicantViewSet, basename="public-applicants"
# )
# router.register(r"interviewers", InterviewerViewSet, basename="interviewers")

# router.register(r"users", CustomUserViewSet, basename="users")
#

# router.register(
#     r"interview-results", InterviewResultViewSet, basename="interview-results"
# )
# router.register(
#     r"job-posting-salaries", JobPostingSalaryViewSet, basename="job-posting-salaries"
# )
# router.register(r"notifications", NotificationViewSet, basename="notifications")
# router.register(r"payslips", PayslipViewSet, basename="payslips")
# router.register(r"time-offs", TimeOffViewSet, basename="time-offs")
# router.register(r"trackings", TrackingViewSet, basename="trackings")


urlpatterns += router.urls

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Importing viewsets for All models
from api.views import ApplicantViewSet
from api.views import CompanyViewSet
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

urlpatterns = [
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh")
]


# Registering viewsets for All models
router = DefaultRouter()
router.register(r"applicant", ApplicantViewSet, basename="applicant")
router.register(r"company", CompanyViewSet, basename="company")
router.register(r"customuser", CustomUserViewSet, basename="customuser")
router.register(r"department", DepartmentViewSet, basename="department")
router.register(r"employee", EmployeeViewSet, basename="employee")
router.register(r"employment", EmploymentViewSet, basename="employment")
router.register(r"interviewer", InterviewerViewSet, basename="interviewer")
router.register(r"interviewresult", InterviewResultViewSet, basename="interviewresult")
router.register(r"jobposting", JobPostingViewSet, basename="jobposting")
router.register(r"jobpostingsalary", JobPostingSalaryViewSet, basename="jobpostingsalary")
router.register(r"jobrole", JobRoleViewSet, basename="jobrole")
router.register(r"notification", NotificationViewSet, basename="notification")
router.register(r"payslip", PayslipViewSet, basename="payslip")
router.register(r"timeoff", TimeOffViewSet, basename="timeoff")
router.register(r"tracking", TrackingViewSet, basename="tracking")

urlpatterns += router.urls

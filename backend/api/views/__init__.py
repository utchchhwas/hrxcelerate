# View Sets for Allicant, Company, CustomUser, Department, Employee, Employment,
# Interviewer, InterviewResult, JobPosting, JobPostingSalary, JobRole, Notification,
# Payslip, TimeOff and Tracking models.

from .ApplicantViewSet import ApplicantViewSet
from .company_views import RetrieveUpdateDestroyCompanyViewSet
from .custom_user_views import CustomUserViewSet
from .department_views import DepartmentViewSet
from .employee_views import CreateCompanyOwnerView, EmployeeViewSet

# from .EmployeeViewSet import EmployeeViewSet
from .employment_views import EmploymentViewSet
from .InterviewerViewSet import InterviewerViewSet
from .InterviewResultViewSet import InterviewResultViewSet
from .job_role_views import JobRoleViewSet
from .JobPostingSalaryViewSet import JobPostingSalaryViewSet
from .JobPostingViewSet import JobPostingViewSet
from .NotificationViewSet import NotificationViewSet
from .PayslipViewSet import PayslipViewSet
from .TimeOffViewSet import TimeOffViewSet
from .TrackingViewSet import TrackingViewSet


from .custom_user_views import ChangePasswordView

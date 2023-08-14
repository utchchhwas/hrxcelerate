# View Sets for Allicant, Company, CustomUser, Department, Employee, Employment,
# Interviewer, InterviewResult, JobPosting, JobPostingSalary, JobRole, Notification,
# Payslip, TimeOff and Tracking models.

from .ApplicantViewSet import ApplicantViewSet
from .department_views import DepartmentViewSet

# from .EmployeeViewSet import EmployeeViewSet
from .EmploymentViewSet import EmploymentViewSet
from .InterviewerViewSet import InterviewerViewSet
from .InterviewResultViewSet import InterviewResultViewSet
from .JobPostingViewSet import JobPostingViewSet
from .JobPostingSalaryViewSet import JobPostingSalaryViewSet
from .JobRoleViewSet import JobRoleViewSet
from .NotificationViewSet import NotificationViewSet
from .PayslipViewSet import PayslipViewSet
from .TimeOffViewSet import TimeOffViewSet
from .TrackingViewSet import TrackingViewSet

from .company_views import CompanyRetrieveUpdateDestroyViewSet
from .employee_views import CreateCompanyOwnerView

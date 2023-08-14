# Serializer for Allicant, Company, CustomUser, Department, Employee, Employment,
# Interviewer, InterviewResult, JobPosting, JobPostingSalary, JobRole, Notification,
# Payslip, TimeOff and Tracking models.

from .company_serializer import CompanySerializer
from .CustomUserSerializer import CustomUserSerializer
from .employee_serializer import CreateCompanyOwnerSerializer

from .ApplicantSerializer import ApplicantSerializer
from .department_serializers import DepartmentSerializer

# from .EmployeeSerializer import EmployeeSerializerOld
from .EmploymentSerializer import EmploymentSerializer
from .InterviewerSerializer import InterviewerSerializer
from .InterviewResultSerializer import InterviewResultSerializer
from .JobPostingSerializer import JobPostingSerializer
from .JobPostingSalarySerializer import JobPostingSalarySerializer
from .job_role_serializers import JobRoleSerializer
from .NotificationSerializer import NotificationSerializer
from .PayslipSerializer import PayslipSerializer
from .TimeOffSerializer import TimeOffSerializer
from .TrackingSerializer import TrackingSerializer

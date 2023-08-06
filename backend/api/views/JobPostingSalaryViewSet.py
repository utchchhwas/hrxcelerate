from rest_framework.viewsets import ModelViewSet
from api.models import JobPostingSalary
from api.serializers import JobPostingSalarySerializer


class JobPostingSalaryViewSet(ModelViewSet):
    queryset = JobPostingSalary.objects.all()
    serializer_class = JobPostingSalarySerializer

from rest_framework import serializers
from api.models import JobPostingSalary


class JobPostingSalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPostingSalary
        fields = "__all__" 
        
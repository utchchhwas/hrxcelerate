from rest_framework.viewsets import ModelViewSet
from api.models import Payslip
from api.serializers import PayslipSerializer


class PayslipViewSet(ModelViewSet):
    queryset = Payslip.objects.all()
    serializer_class = PayslipSerializer
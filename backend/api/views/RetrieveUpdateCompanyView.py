from rest_framework import generics
from api.models import Company
from api.serializers import CompanySerializer
from rest_framework import authentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from api.permissions import IsReadOnly, IsCompanyAdmin


class RetrieveUpdateCompanyView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsReadOnly | IsCompanyAdmin]
    serializer_class = CompanySerializer

    def get_object(self):
        return self.request.user.employee.company

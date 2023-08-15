from rest_framework.viewsets import ModelViewSet
from api.models import CustomUser
from api.serializers import CustomUserSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from api.permissions import IsAdminEmployee
from rest_framework import views, viewsets, generics
from api.serializers import ChangePasswordSerializer
from rest_framework.response import Response
from django.contrib.auth import update_session_auth_hash
from rest_framework import status


class CustomUserViewSet(ModelViewSet):
    """ """

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class ChangePasswordView(generics.GenericAPIView):
    """
    View for changing user password.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        """
        Need to override this method to return the current user.
        """
        return self.request.user

    def put(self, request, *args, **kwargs):
        user = self.get_object()

        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data["new_password"]
        user.set_password(password)
        user.save()

        # Update the user's current session so that
        # the user does not get logged out.
        update_session_auth_hash(request, user)

        return Response(
            {"message": "Password successfully changed."},
            status=status.HTTP_200_OK,
        )

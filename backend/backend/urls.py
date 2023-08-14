from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from upload.views import image_upload


urlpatterns = [
    path("upload/", image_upload, name="upload"),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]

# if bool(settings.DEBUG):
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# s3upload/urls.py
from django.urls import path
from .views import S3UploadURLView

urlpatterns = [
    path("s3/upload-url/", S3UploadURLView.as_view(), name="s3-upload-url"),
]

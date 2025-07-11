# s3upload/views.py
import boto3
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

class S3UploadURLView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        filename = request.data.get("filename")
        filetype = request.data.get("filetype")

        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )

        key = f"uploads/{filename}"
        url = s3.generate_presigned_url(
            ClientMethod="put_object",
            Params={
                "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                "Key": key,
                "ContentType": filetype,
            },
            ExpiresIn=3600,
        )

        return Response({"url": url, "key": key})

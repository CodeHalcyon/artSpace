from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/events/', include('events.urls')),
    path('api/artworks/', include('artworks.urls')),
    path("api/users/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("s3upload.urls")), 
]

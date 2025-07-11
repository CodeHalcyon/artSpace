from django.urls import path
from .views import ArtworkListCreateView, ArtworkDetailView
from .views import FavoriteListCreateView, FavoriteDeleteView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('', ArtworkListCreateView.as_view(), name='artwork-list-create'),
    path('<int:pk>/', ArtworkDetailView.as_view(), name='artwork-detail'),
    path('favorites/', FavoriteListCreateView.as_view(), name='favorite-list-create'),
    path('favorites/<int:pk>/', FavoriteDeleteView.as_view(), name='favorite-delete'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
 
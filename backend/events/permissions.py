# events/permissions.py
from rest_framework.permissions import BasePermission

class IsAdminOrArtist(BasePermission):
    """
    Allow only users with 'admin' or 'artist' role to create/edit/delete.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.role == 'admin' or request.user.role == 'artist'
        )

    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user or request.user.role == 'admin'

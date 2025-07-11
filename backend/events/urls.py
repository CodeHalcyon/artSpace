# events/urls.py
from django.urls import path
from .views import EventListCreateView, EventDetailView, RegisterForEventView, MyRegisteredEventsView, EventAttendeesView

urlpatterns = [
    path('', EventListCreateView.as_view(), name='event-list'),
    path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('register/', RegisterForEventView.as_view(), name='event-register'),
    path('my-registrations/', MyRegisteredEventsView.as_view(), name='my-registered-events'),
    path('<int:event_id>/attendees/', EventAttendeesView.as_view(), name='event-attendees'),
]

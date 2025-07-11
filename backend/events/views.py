from rest_framework import generics, permissions, filters
from .models import Event, EventRegistration
from .serializers import EventSerializer, EventRegistrationSerializer
from .permissions import IsAdminOrArtist
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['location']
    search_fields = ['title', 'description', 'location']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminOrArtist()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated(), IsAdminOrArtist()]
        return [permissions.AllowAny()]
class RegisterForEventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        event_id = request.data.get('event')
        try:
            event = Event.objects.get(id=event_id)
            if EventRegistration.objects.filter(user=request.user, event=event).exists():
                return Response({"message": "Already registered"}, status=200)
            EventRegistration.objects.create(user=request.user, event=event)
            return Response({"message": "Registered successfully"}, status=201)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)


# views.py
class MyRegisteredEventsView(generics.ListAPIView):
    serializer_class = EventRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print("Current user:", self.request.user)  # Debug line
        return EventRegistration.objects.filter(user=self.request.user)

class EventAttendeesView(generics.ListAPIView):
    serializer_class = EventRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        event_id = self.kwargs['event_id']
        return EventRegistration.objects.filter(event__id=event_id, event__created_by=self.request.user)
class RegisterForEventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        event_id = request.data.get('event')
        try:
            event = Event.objects.get(id=event_id)
            exists = EventRegistration.objects.filter(user=request.user, event=event).exists()
            if exists:
                return Response({"message": "Already registered"}, status=200)
            EventRegistration.objects.create(user=request.user, event=event)

            event.attendees.add(request.user)
            return Response({"message": "Registered successfully"}, status=200)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)
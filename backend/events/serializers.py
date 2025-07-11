# events/serializers.py
from rest_framework import serializers
from .models import Event, EventRegistration

class EventSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField(source="created_by.username")
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location', 'created_by', 'created_at','created_by_username',"poster_url"]
        read_only_fields = ['created_by', 'created_at']
# serializers.py
class EventRegistrationSerializer(serializers.ModelSerializer):
    event_title = serializers.ReadOnlyField(source='event.title')
    event_date = serializers.ReadOnlyField(source='event.date')

    class Meta:
        model = EventRegistration
        fields = ['id', 'event', 'user', 'registered_at', 'event_title', 'event_date']
        read_only_fields = ['user', 'registered_at']

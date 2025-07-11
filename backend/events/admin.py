# events/admin.py
from django.contrib import admin
from .models import Event

# events/admin.py
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'get_creator')

    def get_creator(self, obj):
        return obj.created_by.username if obj.created_by else "-"
    get_creator.short_description = 'Created By'

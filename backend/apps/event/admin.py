from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'section_id', 'start_date_time', 'created_at']
    search_fields = ['title', 'description']
    list_filter = ['section_id', 'created_at']

from django.contrib import admin
from django.contrib import admin
from .models import *

class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['schedule_id', 'section', 'start_time_block', 'end_time_block', 'day_of_week']
    list_filter = ['day_of_week', 'section']
    search_fields = ['section__name', 'day_of_week']
    ordering = ['day_of_week', 'start_time_block']


admin.site.register(Schedule, ScheduleAdmin)


from django.contrib import admin

from django.contrib import admin
from .models import *

class studentobservationsAdmin(admin.ModelAdmin):
    list_display = ('id_observation', 'rut_student', 'id_schedule', 'type_observation', 'description')
    list_filter = ('type_observation',)
    search_fields = ('description', 'rut_student__user__first_name', 'rut_student__user__last_name', 'id_schedule__day_of_week')
    ordering = ('-id_observation',)

admin.site.register(student_observations, studentobservationsAdmin)


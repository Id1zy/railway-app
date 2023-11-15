from django.contrib import admin
from .models import ProfessorAttendance


class ProfessorAttendanceAdmin(admin.ModelAdmin):
    list_display = ['attendance_id', 'professor_rut', 'schedule', 'full_date']

admin.site.register(ProfessorAttendance, ProfessorAttendanceAdmin)
from django.contrib import admin
from .models import StudentAttendance


class StudentAttendanceAdmin(admin.ModelAdmin):
    list_display = ['attendance_id', 'student_rut', 'schedule_id', 'full_date']

admin.site.register(StudentAttendance, StudentAttendanceAdmin)

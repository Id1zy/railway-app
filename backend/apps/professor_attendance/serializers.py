from rest_framework import serializers
from .models import ProfessorAttendance

class ProfessorAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessorAttendance
        fields = ['attendance_id', 'professor_rut', 'schedule', 'full_date']

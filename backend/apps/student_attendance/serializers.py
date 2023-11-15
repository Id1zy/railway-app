from rest_framework import serializers
from .models import StudentAttendance

class StudentAttendanceModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAttendance
        fields = '__all__'

class StudentAttendanceSerializer(serializers.Serializer):
    schedule_id = serializers.IntegerField()
    student_rut = serializers.CharField()
    full_name = serializers.CharField()
    number_attendances = serializers.IntegerField()
    number_absences = serializers.IntegerField()


class StudentAttendanceOfDateSerializer(serializers.Serializer):
    schedule_id = serializers.IntegerField()
    student_rut = serializers.CharField()
    full_name = serializers.CharField()
    attendance = serializers.IntegerField()
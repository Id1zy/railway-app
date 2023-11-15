from rest_framework import serializers
from .models import student_observations
from backend.apps.student.models import *
from backend.apps.section.models import * 
from backend.apps.schedule.models import * 
from backend.apps.subject.models import *
from backend.apps.student_section.models import *
from backend.apps.user.models import *


class SubjectSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source='school.name', read_only=True)  

    class Meta:
        model = subject
        fields = ['name', 'school_name']  


class SectionDetailsSerializer(serializers.ModelSerializer):
    subject_details = SubjectSerializer(source='subject', read_only=True)

    class Meta:
        model = Section
        fields = ['section_id', 'subject_details', 'name']


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['schedule_id','start_time_block', 'end_time_block', 'day_of_week']

class StudentObservationSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='rut_student.user.get_full_name', read_only=True)
    schedule_details = ScheduleSerializer(source='id_schedule', read_only=True)
    section_details = SectionDetailsSerializer(source='id_schedule.section', read_only=True)

    class Meta:
        model = student_observations
        fields = ['id_observation', 'student_name', 'type_observation', 'description', 'schedule_details', 'section_details', 'is_active']


class StudentWithObservationsSerializer(serializers.ModelSerializer):
    observations = StudentObservationSerializer(many=True, source='student_observations_set', read_only=True)
    full_name = serializers.CharField(source='user.get_full_name', read_only=True) # Aquí hice el cambio.

    class Meta:
        model = Student
        fields = ['rut', 'full_name', 'observations']

class StudentSectionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student_rut.user.get_full_name', read_only=True)
    observations = StudentObservationSerializer(many=True, source='student_rut.student_observations_set', read_only=True) 

    class Meta:
        model = StudentSection
        fields = ['student_name', 'student_rut', 'observations']  



class SectionWithStudentsSerializer(serializers.ModelSerializer):
    students = StudentSectionSerializer(many=True, source='studentsection_set', read_only=True)
    subject_details = SubjectSerializer(source='subject', read_only=True)
    schedules = ScheduleSerializer(many=True, source='schedule_set', read_only=True) 

    class Meta:
        model = Section
        fields = ['name', 'subject_details', 'students', 'schedules']  


class StudentObservationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_observations
        fields = ['type_observation', 'description', 'is_active']


class StudentObservationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_observations
        fields = ['rut_student', 'id_schedule', 'type_observation', 'description', 'is_active']

class GuardianWithStudentsSerializer(serializers.ModelSerializer):
    students = StudentWithObservationsSerializer(many=True, source='student_set', read_only=True)

    class Meta:
        model = Guardian
        fields = ['guardian_rut', 'user', 'students']



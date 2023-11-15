from rest_framework import serializers
from .models import Section, Academic_Period
from backend.apps.student.models import *
from backend.apps.section.models import * 
from backend.apps.subject.models import *
from backend.apps.student_section.models import *
from backend.apps.user.models import *
from backend.apps.professor.models import *
from backend.apps.subject.models import *
from backend.apps.course.models import *

class SectionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'





class SectionSpecificScheduleSerializer(serializers.Serializer):
    section_id = serializers.IntegerField()
    course = serializers.IntegerField()
    subject= serializers.IntegerField()
    professor_rut= serializers.CharField()
    period= serializers.IntegerField()
    name= serializers.CharField()
    is_active= serializers.BooleanField()
    num_classes = serializers.IntegerField()
    class_days= serializers.ListField(
        child= serializers.CharField()
    )

class AcademicPeriodModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic_Period
        fields = '__all__'


####################



class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ('rut', 'user', 'school', 'full_name', 'is_active')

    def get_full_name(self, obj):
        return obj.user.get_full_name()

    def get_is_active(self, obj):
        return obj.user.is_active

class ProfessorSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Professor
        fields = ('full_name',)

    def get_full_name(self, obj):
        return obj.user.get_full_name()

class StudentSectionSerializer(serializers.ModelSerializer):
    student_rut = serializers.SerializerMethodField()

    class Meta:
        model = StudentSection
        fields = ('student_rut', 'is_active')

    def get_student_rut(self, obj):
        if obj.is_active:
            student_serializer = StudentSerializer(obj.student_rut)
            return student_serializer.data
        return None

#NO CAMBIAR ESTO
class SectionSerializer2(serializers.ModelSerializer):
    professor = ProfessorSerializer(source='professor_rut', read_only=True)
    subject_name = serializers.StringRelatedField(source='subject', read_only=True)
    subject_id = serializers.IntegerField(source='subject.id_subject', read_only=True)
    period = serializers.StringRelatedField()
    studentsection_set = StudentSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ('section_id', 'name', 'is_active', 'professor', 'professor_rut', 'subject_name', 'subject_id', 'period', 'studentsection_set')

class SectionSerializer(serializers.Serializer):
    section_id = serializers.IntegerField()
    subject = serializers.IntegerField()
    course = serializers.IntegerField()
    professor_rut = serializers.CharField(max_length=10)
    period = serializers.CharField(max_length=20)
    name = serializers.CharField(max_length=100)
    is_active = serializers.BooleanField()


class CourseSerializer(serializers.ModelSerializer):
    sections = SectionSerializer2(source='section_set', many=True, read_only=True)

    class Meta:
        model = Course
        fields = ('id_course', 'school', 'nivel', 'is_active', 'sections')

class AcademicPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic_Period
        fields = ['id', 'period_name', 'start_time_period', 'end_time_period']
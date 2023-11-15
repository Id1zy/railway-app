from rest_framework import serializers
from .models import Event
from backend.apps.section.models import *
from backend.apps.course.models import *
from backend.apps.subject.models import *


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id_course', 'nivel']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = subject
        fields = ['id_subject', 'name']

class SectionModelSerializer2(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Section
        fields = ['section_id', 'course', 'subject','professor_rut','period','name','is_active']

class EventSerializer(serializers.ModelSerializer):
    section_id = SectionModelSerializer2(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title', 'description', 'start_date_time', 'section_id']

    def get_fields(self, *args, **kwargs):
        fields = super(EventCreateSerializer, self).get_fields(*args, **kwargs)
        request = self.context['request']
        
        if request.user.rol == "profesor":
            professor = Professor.objects.get(user=request.user)
            fields['section_id'].queryset = Section.objects.filter(professor_rut=professor.professor_rut)

        return fields

class EventStartTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['start_date_time']

class EventUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['section_id', 'title', 'description', 'start_date_time']


class EventDesactivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['is_active']







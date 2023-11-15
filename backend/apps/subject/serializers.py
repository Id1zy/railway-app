from rest_framework import serializers
from .models import subject

class subjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = subject
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = subject
        fields = ['id_subject','school','name','is_active']

class SubjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = subject
        fields = ['name']


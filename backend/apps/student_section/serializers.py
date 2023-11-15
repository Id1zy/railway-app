from rest_framework import serializers
from .models import *
from backend.apps.student.models import Student


class StudentSectionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSection
        fields = '__all__'

class StudentSectionSerializer(serializers.Serializer):
    student_rut = serializers.CharField()
    full_name = serializers.CharField()





class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'email', 'is_active')

class StudentSerializer(serializers.ModelSerializer):
    user = UserAccountSerializer()

    class Meta:
        model = Student
        fields = ('rut', 'user', 'guardian_rut', 'school')

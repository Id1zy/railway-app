from rest_framework import serializers
from .models import Guardian, Meeting_request

class GuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guardian
        fields = '__all__' 

class MeetingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting_request
        fields = '__all__'
from rest_framework import serializers
from .models import weighted_average

class WAverageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = weighted_average
        fields = '__all__'
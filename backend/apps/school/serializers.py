from rest_framework import serializers
from .models import school

class schoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = school
        fields = '__all__'  

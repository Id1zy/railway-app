from rest_framework import serializers
from .models import *

class ScheduleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['schedule_id', 'section', 'start_time_block', 'end_time_block', 'day_of_week']


class ScheduleSerializerForSend(serializers.Serializer):
    id= serializers.IntegerField()
    init= serializers.DateField()
    fin= serializers.DateField()
    day= serializers.CharField()
    status= serializers.BooleanField()
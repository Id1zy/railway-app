from rest_framework import serializers
from .models import Professor
from backend.apps.guardian.models import Available_times
from backend.apps.notification.models import Notification

from backend.apps.user.models import UserAccount

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'

class AvailableTimeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Available_times
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model = UserAccount
        fields = ['email', 'first_name', 'last_name', 'full_name', 'avatar', 'rol']

class ProfessorSerializer2(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Professor
        fields = ['professor_rut', 'user', 'phone', 'school']


class NotificationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
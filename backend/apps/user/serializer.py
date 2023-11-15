from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer, UserDeleteSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from .models import UserAccount, Secretary, Director, Inspector, UTP
from backend.apps.professor.models import Professor
from backend.apps.student.models import Student
from backend.apps.guardian.models import Guardian
from django.db import IntegrityError

User = UserAccount

class UTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = UTP
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class InspectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inspector
        fields = '__all__'

class SecretarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Secretary
        fields = '__all__'

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'rol', 'password', 'is_active')


    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['rol'] = user.rol
        token['email'] = user.email
        token['is_staff'] = user.is_staff

        return token

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


class AvatarUpdateSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()

    class Meta:
        model = UserAccount
        fields = ('id','avatar',)

class UserPartialUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'
        extra_kwargs = {
            'password': {'required': False},
            'rol': {'required': False}
        }

class UserDeactivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('is_active',)
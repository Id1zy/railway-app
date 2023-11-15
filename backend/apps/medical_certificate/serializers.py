from rest_framework import serializers
from .models import MedicalCertificate

class MedicalCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalCertificate
        fields = '__all__'

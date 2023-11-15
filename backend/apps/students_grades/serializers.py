from rest_framework import serializers
from .models import student_grades

class GradesSerializer(serializers.ModelSerializer):
    weighted_average = serializers.CharField()
    class Meta:
        model = student_grades
        fields = '__all__'  


        

class DetailGradesSerializer(serializers.Serializer):
    student_rut = serializers.CharField()
    full_name = serializers.CharField()
    grade = serializers.DictField(
        child = serializers.CharField()
    )

class GradeForProfessorSerializer(serializers.Serializer):
    student_rut = serializers.CharField()
    full_name = serializers.CharField()
    #grade = serializers.DecimalField(max_digits=5, decimal_places=2)
    grade = serializers.ListField(
        child = serializers.DictField(
                child=serializers.CharField()
            )
    )
from rest_framework import serializers
from .models import *


class ColegioSerializer(serializers.ModelSerializer):
    num_cursos = serializers.SerializerMethodField()
    num_estudiantes = serializers.SerializerMethodField()
    num_profesores = serializers.SerializerMethodField()

    class Meta:
        model = Colegio
        fields = '__all__'
        read_only_fields = ['num_cursos', 'num_estudiantes', 'num_profesores']

    def get_num_cursos(self, obj):
        return obj.cursos.count()

    def get_num_estudiantes(self, obj):
        return Estudiante.objects.filter(curso__colegio=obj).count()

    def get_num_profesores(self, obj):
        return Profesor.objects.filter(cursos__colegio=obj).distinct().count()

class CursoSerializer(serializers.ModelSerializer):
    profesor_jefe = serializers.StringRelatedField()

    class Meta:
        model = Curso
        fields = '__all__'

class ProfesorSerializer(serializers.ModelSerializer):
    cursos = CursoSerializer(many=True)

    class Meta:
        model = Profesor
        fields = '__all__'

class ApoderadoSerializer(serializers.ModelSerializer):
    estudiantes_a_cargo = serializers.StringRelatedField(many=True, source='estudiante_set')

    class Meta:
        model = Apoderado
        fields = '__all__'

class EstudianteSerializer(serializers.ModelSerializer):
    curso_nombre = serializers.StringRelatedField(source='curso')
    colegio_nombre = serializers.StringRelatedField(source='curso.colegio')
    apoderado_nombre = serializers.StringRelatedField(source='apoderado')

    class Meta:
        model = Estudiante
        fields = '__all__'
        read_only_fields = ['curso_nombre', 'colegio_nombre', 'apoderado_nombre']


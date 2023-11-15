from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied, ValidationError
from .models import StudentSection
from backend.apps.user.models import UserAccount as User
from backend.apps.student.models import Student
from .serializers import StudentSectionSerializer, StudentSerializer
from django.shortcuts import get_object_or_404
from backend.apps.section.models import *
from backend.apps.course.models import *
from rest_framework.pagination import PageNumberPagination
from django.db import transaction

from rest_framework.response import Response
from rest_framework import status


AUTHORIZED = ["profesor", "estudiante","UTP"]

class StudentSectionList(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSectionSerializer

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            section_id = self.kwargs["pk"]
            students_rut = StudentSection.objects.values('student_rut')\
                    .filter(is_active=True)\
                        .filter(student_rut__user__is_active=True)\
                            .filter(section_id = section_id)\
                                .order_by('student_rut__user__last_name')
            result = []
            for st in students_rut:
                currentSt = Student.objects.get(pk= st["student_rut"])
                user = User.objects.get(pk= currentSt.user.pk)
                user_data = {
                    "student_rut": st["student_rut"],
                    "full_name": user.get_full_name()
                }
                result.append(user_data)
                
            return result
        else:
            raise PermissionDenied


AUTHORIZED2 = ("UTP",)

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 100  
    page_size_query_param = 'page_size'
    max_page_size = 1000

class StudentsWithoutSectionListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = LargeResultsSetPagination  

    def get_serializer_class(self):
        user_role = self.request.user.rol
        if user_role == "UTP":
            return StudentSerializer

    def get_queryset(self):
        user_role = self.request.user.rol

        if user_role not in AUTHORIZED:
            raise PermissionDenied

        if user_role == "UTP":
            section_ids_with_courses = Section.objects.filter(course__isnull=False).values_list('section_id', flat=True)

            active_students = Student.objects.filter(user__is_active=True)

            return active_students.exclude(rut__in=StudentSection.objects.filter(section_id__in=section_ids_with_courses).values_list('student_rut', flat=True))

        else:
            return Student.objects.none()

class AddStudentsToSectionsView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_role = self.request.user.rol
        if user_role not in ["profesor", "administrador", "UTP"]:
            raise PermissionDenied("No tienes permiso para realizar esta acción.")

        curso_id = request.data.get('course_id')
        estudiantes_ruts = request.data.get('students', [])

        secciones_curso = Section.objects.filter(course=curso_id)

        estudiantes = Student.objects.filter(rut__in=estudiantes_ruts)

        estudiante_por_rut = {estudiante.rut: estudiante for estudiante in estudiantes}
        
        estudiantes_ya_asignados = StudentSection.objects.filter(
            student_rut__in=estudiantes_ruts, 
            section_id__in=secciones_curso.values_list('section_id', flat=True)
        ).values_list('student_rut', 'section_id')

        asignaciones_existentes = {rut: [] for rut in estudiantes_ruts}
        for rut, section_id in estudiantes_ya_asignados:
            asignaciones_existentes[rut].append(section_id)

        student_sections_to_create = [
            StudentSection(student_rut=estudiante_por_rut[estudiante_rut], section_id=seccion)
            for estudiante_rut in estudiantes_ruts
            for seccion in secciones_curso
            if seccion.section_id not in asignaciones_existentes.get(estudiante_rut, [])
        ]

        with transaction.atomic():
            StudentSection.objects.bulk_create(student_sections_to_create)

        return Response({"mensaje": "Estudiantes asignados exitosamente."}, status=status.HTTP_201_CREATED)
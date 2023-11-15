from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import SectionSerializer, SectionModelSerializer, AcademicPeriodModelSerializer,AcademicPeriodSerializer, SectionSerializer2
from django.http import HttpResponse
from django.core.exceptions import (
    PermissionDenied,
    SuspiciousOperation,
)
from django.urls import NoReverseMatch
from django.shortcuts import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination

# Serializers
from .serializers import (
    SectionSerializer, 
    SectionModelSerializer, 
    SectionSpecificScheduleSerializer,
    CourseSerializer
)
from backend.apps.subject.serializers import subjectSerializer
from backend.apps.professor.serializers import ProfessorSerializer
from backend.apps.student.serializers import StudentSerializer
from backend.apps.student_section.serializers import StudentSectionModelSerializer
from backend.apps.event.serializers import SectionModelSerializer2

# Django
from django.http import Http404

# Models 

from backend.apps.user.models import * 
from .models import Course, subject, Professor
from backend.apps.user.models import UserAccount
from .models import Section, Academic_Period
from backend.apps.student.models import Student
from backend.apps.student_section.models import StudentSection
from backend.apps.professor.models import Professor
from backend.apps.schedule.models import Schedule

# Python imports
from datetime import date, timedelta

AUTHORIZED = ["estudiante", "administrador", "UTP", "profesor"]


#======================Serializadores==============================
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'first_name', 'last_name','is_active','email','rol')

class CustomListSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('section_id', 'name', 'is_active','course','professor_rut','subject','subject_id')
        
class AllSectionListPagination(PageNumberPagination):
    page_size = 999


#======================Section==============================

class SectionCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionModelSerializer

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            queryset = Section.objects.all()
            return queryset
        else:
            raise PermissionDenied

class SectionListForStudent(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionSerializer

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            user_id = int(self.request.user.id)
            student = get_object_or_404(Student, user= user_id)
            sections_of_student = StudentSection.objects.filter(is_active = True).filter(student_rut = student.rut)
            result = []
            for s in sections_of_student:
                section = get_object_or_404(Section, section_id = s.section_id.section_id)
                result.append({
                        "section_id" : section.section_id,
                        "subject" : section.subject.id_subject,
                        "course" : section.course.pk,
                        "professor_rut" : section.professor_rut.professor_rut,
                        "period" : section.period.period_name, 
                        "name" : section.name,
                        "is_active" : section.is_active
                })
            return result

        else:
            raise PermissionDenied

class SectionListAllForStudent(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionSerializer

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            user_id = int(self.request.user.id)
            student = get_object_or_404(Student, user= user_id)
            sections_of_student = StudentSection.objects.filter(student_rut = student.rut)
            result = []
            for s in sections_of_student:
                section = get_object_or_404(Section, section_id = s.section_id.section_id)
                result.append({
                        "section_id" : section.section_id,
                        "subject" : section.subject.id_subject,
                        "course" : section.course.pk,
                        "professor_rut" : section.professor_rut.professor_rut,
                        "period" : section.period.period_name, 
                        "name" : section.name,
                        "is_active" : section.is_active
                })
            return result

        else:
            raise PermissionDenied


class SectionListForProfessor(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if(self.request.user.rol in AUTHORIZED):
            professorId = self.kwargs["professorId"]
            try:
                professor = get_object_or_404(Professor, user__pk = professorId)
            except Http404:
                return Response(data={"error": "Error en la búsqueda"}, status=status.HTTP_404_BAD_REQUEST)
            

            queryset = Section.objects.filter(
                is_active = True,
                professor_rut = professor.pk,
                period__start_time_period__lte = date.today(),
                period__end_time_period__gte = date.today()
                )
            
            result = []

            for s in queryset:
                result.append({
                    "section_id": s.pk,
                    "name": f'{s.course.nivel} {s.name}', # For example: "Matemáticas Primero básico A"
                    "period": f'{s.period.period_name}' # For Ex. "Primer semestre 2023"
                })
            
            return Response(result, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied

class LargeResultsSetPagination(LimitOffsetPagination):
    default_limit = 1000 

class SectionListForProfessor2(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionModelSerializer2
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            user_id = int(self.request.user.id)
            profesor = get_object_or_404(Professor, user = user_id)
            queryset = Section.objects.filter(is_active = True).filter(professor_rut = profesor.professor_rut)
            return queryset

class SectionDetailAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionModelSerializer

    def get_queryset(self):
        section_id = self.kwargs["pk"]
        if(section_id is not None and section_id != ""):
            if(self.request.user.rol in AUTHORIZED):
                queryset = Section.objects.filter(section_id = section_id)
                return queryset
            else:
                raise PermissionDenied
        else:
            raise NoReverseMatch

class SectionSpecificSchedule(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionSpecificScheduleSerializer

    def get_queryset(self):
        section_id = self.kwargs["section_id"]
        schedule_id = self.kwargs["schedule_id"]
        if(section_id is not None and section_id != ""):
            # security question
            if(self.request.user.rol in AUTHORIZED):
                # Getting objects
                activeSections = Section.objects.filter(is_active = True)
                sectionInstance = get_object_or_404(activeSections, pk = section_id)
                scheduleInstance = get_object_or_404(Schedule, pk=schedule_id)
                academicPeriod = get_object_or_404(Academic_Period, pk = sectionInstance.period.pk)
                # Dates Working
                start = academicPeriod.start_time_period
                end = academicPeriod.end_time_period
                day_of_week = scheduleInstance.day_of_week - 1 # el -1 porque el lunes comienza en 0 en datetime

                class_days = []
                num_class = 0
                oneDay = timedelta(days=1)

                while(start != end):
                    if(start.weekday()== day_of_week):
                        num_class += 1
                        class_days.append(start)
                    else:
                        pass

                    start = start + oneDay
                result = []
                result.append({
                    "section_id":sectionInstance.pk,
                    "course": sectionInstance.course.pk,
                    "subject": sectionInstance.subject.pk,
                    "professor_rut": sectionInstance.professor_rut.pk,
                    "period":sectionInstance.period.pk,
                    "name": sectionInstance.name,
                    "is_active": sectionInstance.is_active,
                    "num_classes": num_class,
                    "class_days": class_days
                })
                return result

            else:
                raise PermissionDenied
        else:
            raise NoReverseMatch


class SectionUpdateAPIView(UpdateAPIView):
    permission_clases = [IsAuthenticated]
    serializer_class = SectionModelSerializer
    queryset = Section.objects.all()

    def put(self, request, *args, **kwargs):
        if self.request.user.rol == 'UTP':
            return self.update(request, *args, **kwargs)
        else:
            raise PermissionDenied("El usuario no tiene permiso para realizar esta acción.")

    def patch(self, request, *args, **kwargs):
        if(self.request.user.rol == 'UTP'):
            return self.partial_update(request, *args, **kwargs)
        else: 
            raise PermissionDenied
        

class SectionDestroyAPIView(DestroyAPIView):
    permission_class = [IsAuthenticated]
    serializer_class = SectionSerializer
    queryset = Section.objects.filter(is_active=True)
    
    def delete(self, request, *args, **kwargs):        
        if self.request.user.rol in AUTHORIZED:
            section_obj = get_object_or_404(Section, pk = kwargs["pk"])
            section_obj.is_active = False
            section_obj.save()
            return HttpResponse("Desactivado correctamente", content_type="text/plain")
        else:
            raise PermissionDenied
        
class ActivateSectionView(DestroyAPIView):
    permission_class = [IsAuthenticated]
    serializer_class = SectionSerializer
    def delete(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:
                 queryset = Section.objects.get(pk = section_id)
                 if (queryset.is_active == False):
                      queryset.is_active = True
                 queryset.save()
                 return Response({'Activate': 'Objeto Activado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
             raise PermissionDenied
        
class DeactivateSectionView(DestroyAPIView):
    permission_class = [IsAuthenticated]
    serializer_class = SectionSerializer
    def delete(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:
                 queryset = Section.objects.get(pk = section_id)
                 if (queryset.is_active == True):
                      queryset.is_active = False
                 queryset.save()
                 return Response({'Deactivate': 'Objeto Desactivado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
             raise PermissionDenied

class SectionListForUTPAPI(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionModelSerializer
    queryset = Section.objects.all()
    pagination_class = AllSectionListPagination

    def get_queryset(self):
        if self.request.user.rol in AUTHORIZED:
            queryset = Section.objects.all()
            return queryset
        else:
            raise PermissionDenied
        

class SectionAlumnListUTPAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        section_id = self.kwargs.get('pk')
        section = get_object_or_404(Section, pk=section_id)

        if self.request.user.rol == 'UTP':
            student_sections = StudentSection.objects.filter(section_id=section)
            users = [student_section.student_rut.user for student_section in student_sections]
            professor = section.professor_rut.user
            users.append(professor)
            return users
        else:
            raise PermissionDenied("No tienes permisos para acceder a esta información.")
        
class SectionInfoUTPAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get(self, request, pk, format=None):
        section = get_object_or_404(Section, pk=pk)

        if self.request.user.rol == 'UTP':
            student_sections = StudentSection.objects.filter(section_id=section)
            students = [student_section.student_rut.user for student_section in student_sections]
            professor = section.professor_rut.user
            courses = section.course
            subject = section.subject

            
            response_data = {
                'student_section': StudentSectionModelSerializer(student_sections, many=True).data,
                'cursos': CourseSerializer(courses).data,
                'estudiantes': CustomUserSerializer(students, many=True).data,
                'profesor': CustomUserSerializer([professor], many=True).data,
                'subject': subjectSerializer(subject).data,
            }

            return Response(response_data)
        else:
            raise PermissionDenied("No tienes permisos para acceder a esta información.")
        
class SectionListProfAPI(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionSerializer
    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            period = Academic_Period.objects.all()
            professors = Professor.objects.all()
            users = UserAccount.objects.all()

            combined_data = []

            for professor in professors:
                user = users.filter(id=professor.user_id).first()

                if user:
                    professor_data = ProfessorSerializer(professor).data
                    user_data = CustomUserSerializer(user).data
                    combined_data.append({**professor_data, **user_data})

            period_queryset = Academic_Period.objects.all()
            course_queryset = Course.objects.all()
            subject_queryset = subject.objects.all()
            professor_serializer = ProfessorSerializer(professors, many=True)

            data_to_send = {
                'academic_period': AcademicPeriodModelSerializer(period_queryset, many=True).data,
                'cursos': CourseSerializer(course_queryset, many=True).data,
                'asignaturas': subjectSerializer(subject_queryset, many=True).data,
                'profesor': combined_data,
            }

            return Response(data_to_send, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied
        


###################
from django.db.models import Prefetch

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 100  
    page_size_query_param = 'page_size'
    max_page_size = 1000

class UTPCourseSectionDetailView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        user_role = self.request.user.rol

        if user_role not in AUTHORIZED:
            raise PermissionDenied

        if user_role == "UTP":
            section_queryset = Section.objects.select_related(
                'professor_rut__user', 
                'subject', 
                'period'
            ).prefetch_related(
                'studentsection_set',
                'studentsection_set__student_rut'
            )

            return Course.objects.prefetch_related(
                Prefetch('section_set', queryset=section_queryset),
            )

        else:
            return Course.objects.none()

class SectionDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SectionSerializer2
    queryset = Section.objects.all()

class LargeResultsSetPagination(LimitOffsetPagination):
    default_limit = 1000

class AcademicPeriodListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AcademicPeriodSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):

        return Academic_Period.objects.all()


##########CRUD PERIOD#############






class AcademicPeriodCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AcademicPeriodSerializer

    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)

class AcademicPeriodUpdateView(UpdateAPIView):
    queryset = Academic_Period.objects.all()
    serializer_class = AcademicPeriodModelSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)


class AcademicPeriodDeleteAPIView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Academic_Period.objects.all()
    serializer_class = AcademicPeriodSerializer

    def delete(self, request, pk, *args, **kwargs):
        if self.request.user.rol != "UTP":
            raise PermissionDenied("No tienes permiso para eliminar este periodo.")

        period_instance = get_object_or_404(Academic_Period, pk=pk)
        period_instance.delete()
        return Response({'message': 'Periodo académico eliminado correctamente.'}, status=status.HTTP_200_OK)
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from .models import student_observations
from django.core.exceptions import PermissionDenied
from .serializers import StudentObservationSerializer,SectionWithStudentsSerializer, StudentObservationUpdateSerializer, StudentObservationCreateSerializer, GuardianWithStudentsSerializer
from backend.apps.student.models import *
from backend.apps.section.models import * 
from rest_framework.generics import ListAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from backend.apps.course.models import Course

from backend.apps.course.serializers import CourseSerializer
from backend.apps.section.models import Section
from django.db.models import Count, F
from django.http import JsonResponse
from backend.apps.student_section.models import StudentSection as StSn

AUTHORIZED = ["profesor","estudiante","apoderado", "director"]

class StudentObservationListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        user_role = self.request.user.rol
        if user_role == "estudiante":
            return StudentObservationSerializer
        elif user_role == "profesor":
            return SectionWithStudentsSerializer
        elif user_role == "apoderado":
            return GuardianWithStudentsSerializer

    def get_queryset(self):
        user_role = self.request.user.rol

        if user_role not in AUTHORIZED:
            raise PermissionDenied

        if user_role == "estudiante":
            student = get_object_or_404(Student, user=self.request.user.id)
            return student_observations.objects.filter(rut_student=student.rut)

        elif user_role == "profesor":
            professor = get_object_or_404(Professor, user=self.request.user.id)
            return Section.objects.filter(professor_rut=professor.professor_rut).prefetch_related('studentsection_set__student_rut__student_observations_set')

        elif user_role == "apoderado":
            return Guardian.objects.filter(user=self.request.user).prefetch_related('student_set__student_observations_set')


        else:
            return student_observations.objects.none()
        

class StObsFilteredBySection(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            section_id = self.kwargs["section_id"]

            students_related = StSn.objects.filter(section_id = section_id) # StSn == StudentSection
            result = [{
                "students": []
            }]

            for st in students_related:
                student = get_object_or_404(Student, rut = st.student_rut.pk)
                user_related = get_object_or_404(UserAccount, pk = student.user.pk)
                observations = student_observations.objects.filter(rut_student = student.pk)
                
                obs_list = []
                for obs in observations:
                    obs_list.append({
                        "id_observation": obs.id_observation,
                        "rut_student": obs.rut_student.pk,
                        "schedule_details": {
                            "day_of_week": obs.id_schedule.day_of_week,
                            "start_time_block": obs.id_schedule.start_time_block,
                            "end_time_block": obs.id_schedule.end_time_block,
                        },
                        "type_observation": obs.get_type_observation_display(),
                        "description": obs.description,
                        "is_active": obs.is_active
                    })

                result[0]["students"].append({
                    "student_name": user_related.get_full_name(),
                    "student_rut": student.pk,
                    "observations": obs_list,
                })

            return Response(result, status = status.HTTP_200_OK)
        else:
            raise PermissionDenied
        

class StudentObservationUpdateView(UpdateAPIView):
    queryset = student_observations.objects.all()
    serializer_class = StudentObservationUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()

        user_role = self.request.user.rol
        if user_role != "profesor":
            raise PermissionDenied("No tienes permiso para editar esta observación.")
        
        return obj

class ObservationDeactivateAPIView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentObservationUpdateSerializer
    queryset = student_observations.objects.all()

    def delete(self, request, *args, **kwargs):
        if self.request.user.rol == "profesor":  
            observation = self.get_object()
            observation.is_active = False
            observation.save()
            return Response({"mensaje": "Observación desactivada correctamente."}, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied("No tienes permiso para desactivar esta observación.")
        

class StudentObservationCreateView(CreateAPIView):
    queryset = student_observations.objects.all()
    serializer_class = StudentObservationCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.rol != "profesor":
            raise PermissionDenied("Solo un profesor puede agregar una observación.")
        serializer.save()


class StudentObservationAllView(ListAPIView):
    permission_classes = [IsAuthenticated]
        
    def list(self, request):
        if request.user.rol in AUTHORIZED:
            courses = Course.objects.filter(is_active=True)
            result = []

            for course in courses:
                sections = Section.objects.filter(course=course, is_active=True)

                total_annotations = 0
                positive_annotations = 0
                negative_annotations = 0

                filtered_observations = student_observations.objects.filter(
                    id_schedule__section__in=sections,
                    is_active=True
                )

                positive_annotations = filtered_observations.filter(type_observation='positiva').count()
                negative_annotations = filtered_observations.filter(type_observation='negativa').count()
                total_annotations = positive_annotations + negative_annotations

                positive_percentage = 0 if total_annotations == 0 else (positive_annotations / total_annotations) * 100
                negative_percentage = 0 if total_annotations == 0 else (negative_annotations / total_annotations) * 100

                course_data = {
                    'id_course': course.id_course,
                    'curso': str(course.nivel),
                    'total_anotaciones': total_annotations,
                    'anotaciones_positivas': positive_annotations,
                    'anotaciones_negativas': negative_annotations,
                    'porcentaje_anotaciones_positivas': positive_percentage,
                    'porcentaje_anotaciones_negativas': negative_percentage,
                    'secciones': []
                }

                for section in sections:
                    section_data = {
                        'section_id': section.section_id,
                        'nombre_seccion': section.name,
                        'anotaciones_positivas': filtered_observations.filter(
                            id_schedule__section=section,
                            type_observation='positiva'
                        ).count(),
                        'anotaciones_negativas': filtered_observations.filter(
                            id_schedule__section=section,
                            type_observation='negativa'
                        ).count(),
                    }

                    course_data['secciones'].append(section_data)

                result.append(course_data)

            return JsonResponse(result, safe=False)
        else:
            raise PermissionDenied

    



class StudentObsCourseIdView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if request.user.rol in AUTHORIZED:
            try:
                course = Course.objects.get(pk=pk)
            except Course.DoesNotExist:
                return JsonResponse({'error': 'El curso no existe.'}, status=404)

            sections = Section.objects.filter(course=course, is_active=True)

            total_annotations = 0
            positive_annotations = 0
            negative_annotations = 0

            filtered_observations = student_observations.objects.filter(
                id_schedule__section__in=sections,
                is_active=True
            )

            positive_annotations = filtered_observations.filter(type_observation='positiva').count()
            negative_annotations = filtered_observations.filter(type_observation='negativa').count()
            total_annotations = positive_annotations + negative_annotations

            positive_percentage = 0 if total_annotations == 0 else (positive_annotations / total_annotations) * 100
            negative_percentage = 0 if total_annotations == 0 else (negative_annotations / total_annotations) * 100

            course_data = {
                'id_course': course.id_course,
                'curso': str(course.nivel),
                'total_anotaciones': total_annotations,
                'anotaciones_positivas': positive_annotations,
                'anotaciones_negativas': negative_annotations,
                'porcentaje_anotaciones_positivas': positive_percentage,
                'porcentaje_anotaciones_negativas': negative_percentage,
                'secciones': []
            }

            for section in sections:
                filtered_observations_section = filtered_observations.filter(id_schedule__section=section)

                section_data = {
                    'section_id': section.section_id,
                    'nombre_seccion': section.name,
                    'total_anotaciones': filtered_observations_section.count(),
                    'anotaciones_positivas': filtered_observations_section.filter(type_observation='positiva').count(),
                    'anotaciones_negativas': filtered_observations_section.filter(type_observation='negativa').count(),
                }

                course_data['secciones'].append(section_data)

            result = [course_data]

            return JsonResponse(result, safe=False)
        else:
            raise PermissionDenied
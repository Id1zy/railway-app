from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework import serializers 
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.generics import *
from django.core.exceptions import (
    PermissionDenied,
)
#Serializer
from .serializers import CourseSerializer
from backend.apps.user.serializer import UTPSerializer
#Models
from .models import Course
from backend.apps.professor.models import Professor
from backend.apps.section.models import Section
from backend.apps.student_section.models import StudentSection
from backend.apps.user.models import UTP, Inspector
from backend.apps.school.models import school
from backend.apps.user.models import UserAccount


AUTHORIZED = ["estudiante", "administrador", "UTP", "director"]

class AllCoursesPagination(PageNumberPagination):
    page_size = 999

#======================Serializadores==============================
class CustomUTPSerializer(UTPSerializer):
     school_name = serializers.CharField(source='school.name', read_only=True)
     class Meta:
        model = UTP
        fields = '__all__'

#======================Course==============================
class ListCourseView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:
                 utp_instance = UTP.objects.get(user__pk = self.request.user.id)
                 courses = Course.objects.all().filter(school = utp_instance.school)
                 queryset = []
                 for course in courses:
                      data_to_send = {
                           'Course':{
                                'id': course.id_course,
                                'nivel': course.nivel,
                                'school': course.school.name,
                                'status': course.is_active
                                },
                       }
                      queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
                 

class CreateCourseView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:

                      utp_instance = UTP.objects.get(user__pk = self.request.user.id)
                      school_instance = school.objects.get(rbd = utp_instance.school.rbd )
                      
                      
                      course_instance = Course(
                           nivel = request.data['nivel'],
                           school= school_instance
                           )
                      course_instance.save()
                      return Response({'created': 'created'}, status=status.HTTP_201_CREATED)

                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditCourseView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer

    def patch(self, request, course_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:
                 
                 print(request.data['nivel'])
                 course_instance = Course.objects.get(pk = course_id)
                 course_instance.nivel = request.data['nivel']
                 course_instance.save()
                 

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetCourseView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer

    def get(self, request, course_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:
                 user = Course.objects.get(pk= course_id)
                 queryset = []
                 data_to_send = {

                                'id':user.pk,
                                'nivel':user.nivel,
                                'is_active':user.is_active,
     
                       }
                 
                 queryset.append(data_to_send)
                 print(queryset)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        

class DeactivateCourseView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = CourseSerializer

     def delete(self, request, course_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:
                 queryset = Course.objects.get(pk = course_id)
                 if (queryset.is_active == True):
                      queryset.is_active = False
                 queryset.save()
                 return Response({'Deactivate': 'Objeto Desactivado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
             raise PermissionDenied
        
class ActivateCourseView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = CourseSerializer

     def delete(self, request, course_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            try:
                 queryset = Course.objects.get(pk = course_id)
                 if (queryset.is_active == False):
                      queryset.is_active = True
                 queryset.save()
                 return Response({'Activate': 'Objeto Activado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
             raise PermissionDenied
            

class UTPSchoolView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id, *args, **kwargs):
        if request.user.rol == 'UTP':
            try:
                userUtp = UTP.objects.get(user=id)
                serialized_data = CustomUTPSerializer(userUtp)
                data_to_send = {
                    'utp': serialized_data.data,
                }
                return Response(data_to_send, status=status.HTTP_200_OK)
            except UTP.DoesNotExist:
                return Response({'error': 'No se encontró el usuario UTP'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class CourseListUtpView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    pagination_class = AllCoursesPagination

    def get_queryset(self):
        if self.request.user.rol in AUTHORIZED:
            queryset = Course.objects.all()
            return queryset
        else:
            raise PermissionDenied

class DirectorCourseInfoView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id, *args, **kwargs):
        if request.user.rol == 'director':
            try:
                course = Course.objects.get(id_course=id)
                course_name = course.nivel
                sections = Section.objects.filter(course=course)
                students = set()
                professors = set()
                for section in sections:
                    student_sections = StudentSection.objects.filter(section_id=section.section_id, is_active=True)
                    for student_section in student_sections:
                        student = student_section.student_rut
                        student_info = {
                            'Name': f"{student.user.first_name} {student.user.last_name}",
                            'Rut': student.rut,
                            'correo': student.user.email
                        }
                        students.add(frozenset(student_info.items()))

                    professor = section.professor_rut
                    professor_info = {
                        'Name': f"{professor.user.first_name} {professor.user.last_name}",
                        'Rut': professor.professor_rut,
                        'Email': professor.user.email
                    }
                    professors.add(frozenset(professor_info.items()))

                students = [dict(s) for s in students]
                professors = [dict(p) for p in professors]

                data_to_send = {
                    'Course': {
                        'CourseName': course_name,
                        'Professors': professors,
                        'Sections': [section.name for section in sections],
                        'Students': students,
                    }
                }

                return Response(data_to_send, status=status.HTTP_200_OK)
            except Course.DoesNotExist:
                return Response({'error': 'El curso no existe'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            raise PermissionDenied
        
        
class CountsDashAPI(ListCourseView):
    def get(self, request, *args, **kwargs):
        course_count = Course.objects.filter(is_active=True).count()
        profesor_count = UserAccount.objects.filter(rol='profesor', is_active=True).count()
        inspector_count = UserAccount.objects.filter(rol='inspector', is_active=True).count()
        utp_count = UserAccount.objects.filter(rol='UTP', is_active=True).count()

        data = {
            'course_count': course_count,
            'profesor_count': profesor_count,
            'inspector_count': inspector_count,
            'utp_count': utp_count,
        }

        return Response(data, status=status.HTTP_200_OK)

class CourseUpdateAPIView(UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {"request": self.request}

    def get_queryset(self):
        user_role = self.request.user.rol

        if user_role not in AUTHORIZED:
            raise PermissionDenied

        if user_role == "UTP":
            utp = get_object_or_404(UTP, user=self.request.user.id)
            return Course.objects.filter(school=utp.school)
        else:
            return Course.objects.none()

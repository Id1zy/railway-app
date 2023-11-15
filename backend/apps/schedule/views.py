from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework import generics
from django.core.exceptions import ValidationError
from django.core.exceptions import (
    PermissionDenied,
)

from .models import Schedule
from backend.apps.user.models import UserAccount
from backend.apps.user.models import UTP
from backend.apps.school.models import school
from backend.apps.section.models import Section
from backend.apps.course.models import Course
from .serializers import ScheduleModelSerializer, ScheduleSerializerForSend
from datetime import datetime, time

def convert_to_time(hour):
    time_ = datetime.strptime(hour, '%H:%M').time()
    return time_



AUTHORIZED = ["UTP" ,"administrador"]


class SectionListView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):

            queryset_ = []
            utp_instance = UTP.objects.filter(user=self.request.user.id).exists()
            utp_instance2 = UTP.objects.get(user=self.request.user.id)
            if (utp_instance):
                print(self.request.user.id)
                school_instance = school.objects.get(rbd= utp_instance2.school.rbd)
                course_instance = Course.objects.all().filter(school = school_instance, is_active=True)

                queryset_ = []
                for course_ in course_instance:
                    data_to_send = {
                        'Course':{                                      
                            'id': course_.pk,
                            'nivel': course_.nivel
                        },
                        'Section': []
                    }
                    sections = Section.objects.all().filter(course = course_ )
                    for section in sections:
                        seccion = {
                            'id': section.pk,
                            'name': section.name, 
                            'period': section.period.period_name,
                            'professor': section.professor_rut.user.get_full_name(),
                            'subject': section.subject.name,
                        }
                        data_to_send['Section'].append(seccion)
                    queryset_.append(data_to_send)


                return Response(queryset_, status=status.HTTP_200_OK)
            else:
             raise PermissionDenied
        else:
            raise PermissionDenied
        
class CreateScheduleView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP'):
            utp_instance = UTP.objects.filter(user=self.request.user.id).exists()
            if (utp_instance):
                try:
                    section_instance = Section.objects.get(pk=section_id)
                    for i in request.data['datos']:
                        block = Schedule(
                            section = section_instance,
                            day_of_week = i['day'],
                            start_time_block = convert_to_time(i['init']),
                            end_time_block = convert_to_time(i['fin'])
                            )
                        block.save()
                    return Response({"message": "Horaria creado exitosamente"}, status=status.HTTP_200_OK)
                except (ValidationError, KeyError, UTP.DoesNotExist) as e:
                    return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
                except Section.DoesNotExist:
                    return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    print(e)
                    return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
             raise PermissionDenied
        else:
             raise PermissionDenied
        
        
class GetBlockScheduleView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'UTP' or self.request.user.rol == 'profesor'):
            utp_instance = UserAccount.objects.filter(pk=self.request.user.id, rol=self.request.user.rol ).exists()
            if (utp_instance):
                try:
                    section_instance = Section.objects.get(pk=section_id)
                    blocks = Schedule.objects.all().filter(section = section_instance)
                    queryset_ = []

                    for bloque in blocks:
                        data_to_send = {
                            'Block':{
                                'id':bloque.pk,
                                'init': bloque.start_time_block,
                                'fin': bloque.end_time_block,
                                'day': bloque.get_day_of_week_display(),
                                'status': bloque.is_active,
                                'section':bloque.section_id
                                }
                            }
                        queryset_.append(data_to_send)

                    return Response(queryset_, status=status.HTTP_200_OK)
                
                except (ValidationError, KeyError, UserAccount.DoesNotExist) as e:
                    return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
                except Section.DoesNotExist:
                    return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
             raise PermissionDenied
        else:
             raise PermissionDenied


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleModelSerializer

class ScheduleCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ScheduleModelSerializer

    def get_queryset(self):
        if self.request.user.rol in AUTHORIZED:
            queryset = Schedule.objects.all()
            return queryset
        else:
            raise PermissionDenied
        
class ScheduleListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ScheduleModelSerializer
    def get_queryset(self):
        if self.request.user.rol in AUTHORIZED:  
            queryset = Schedule.objects.all()
            return queryset
        else:
            raise PermissionDenied
    

class DesactivateScheduleView(APIView):
    def post(self, request, schedule_id):
        schedule = get_object_or_404(Schedule, schedule_id=schedule_id)
        schedule.is_active = False
        schedule.save()
        return Response({"message": "Horario desactivado exitosamente"}, status=status.HTTP_200_OK)


from .serializers import AssignmentSerializer, MiniAssignmentSerializer
from django.conf import settings
from django.db import transaction
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db.models.query_utils import Q
from django.core.exceptions import (
    PermissionDenied,
)
from backend.apps.student.models import Student
from backend.apps.professor.models import Professor
from backend.apps.student_section.models import StudentSection
from backend.apps.guardian.models import Guardian
from backend.apps.notification.models import Notification
from backend.apps.section.models import Section
from .models import Assignment


class AssignmentGetView( generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AssignmentSerializer

    def get(self, request, assignment_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            try:
                queryset = Assignment.objects.get(pk = assignment_id)
                serializer = AssignmentSerializer(queryset)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif (self.request.user.rol == 'estudiante'):
            try:
                queryset = Assignment.objects.get(pk = assignment_id)
                serializer = AssignmentSerializer(queryset)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:

                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            raise PermissionDenied

class AssignmentListView( generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AssignmentSerializer

    def get(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            try:
                queryset = Assignment.objects.all().filter(section_id = section_id).order_by('-id')
                serializer = MiniAssignmentSerializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif (self.request.user.rol == 'estudiante'):
            try:
                queryset = Assignment.objects.all().filter(section_id = section_id).filter(status=1).order_by('-id')
                serializer = MiniAssignmentSerializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            raise PermissionDenied


     
     
class AssignmentCreateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AssignmentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
 
     if (self.request.user.rol == 'profesor'):
        try:
                section_instance = Section.objects.get(pk=int(request.data['section']))

                title_ = request.data.get('title')
                description_ = request.data.get('description')
                deadline_ = request.data.get('deadline')

                assignment_instance = Assignment(
                        title = title_,
                        description = description_,
                        deadline = deadline_,
                        section_id = section_instance,

                    )
                assignment_instance.save()
                section_instance = Section.objects.get(pk = section_instance.pk)
                users_instance = StudentSection.objects.all().filter(section_id = section_instance.pk)
                for user_ in users_instance:
                      noti_instance = Notification(
                           user = user_.student_rut.user,
                           type = 1,
                           issue = 'Asignatura:'+section_instance.subject.name+' - Nuevo Trabajo Asignado.',
                           message = 'Trabajo:'+title_+' - Fecha Límite:'+ deadline_
                           )
                      noti_instance.save()

                      noti_instance_2 = Notification(
                           user = user_.student_rut.guardian_rut.user,
                           type = 1,
                           issue = 'Asignatura:'+section_instance.name+' - Nuevo Trabajo Asignado.',
                           message = 'Estudiante:'+user_.student_rut.user.get_full_name()+' - Trabajo:'+title_+' - Fecha Límite:'+ deadline_
                           )
                      noti_instance_2.save()

                return Response({'created': 'created'}, status=status.HTTP_201_CREATED)

        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
     else:
                raise PermissionDenied

class AssignmentStatusView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = AssignmentSerializer

     def post(self, request, assignment_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            try:
                queryset = Assignment.objects.get(pk= assignment_id)
                queryset.status = request.data.get('status')
                queryset.save()
                return Response({'Status': 'Estado Cambiado'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        else:
            raise PermissionDenied

class AssignmentEditView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AssignmentSerializer
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request,assignment_id, *args, **kwargs):
 
     if (self.request.user.rol == 'profesor'):
        try:
                assignment_edit = Assignment.objects.get(pk=assignment_id)

                title_ = request.data.get('title')
                description_ = request.data.get('description')
                deadline_ = request.data.get('deadline')

                assignment_edit.title = title_
                assignment_edit.description = description_
                assignment_edit.deadline = deadline_
                assignment_edit.save()

                return Response({'updated': 'update'}, status=status.HTTP_200_OK)

        except Exception as e:

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied

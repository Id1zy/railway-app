from django.shortcuts import render
from django.http import FileResponse
#Django Rest Framework
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import generics
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import (
    PermissionDenied,
)
#Models
from backend.apps.guardian.models import Guardian
from backend.apps.student.models import Student
from .models import MedicalCertificate
#Serializer
from .serializers import MedicalCertificateSerializer
import os


class CreateMedicalCertificateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MedicalCertificateSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'apoderado'):
          try:
                rut_ = request.data['student_rut']
                print(request.data)
                guardian_instance = Guardian.objects.get(user__pk = self.request.user.id)
                student_instance = Student.objects.get(rut = rut_)

                name_ = request.data['name']
                description_ = request.data['description']
                file_ = request.FILES.getlist('File[]')

                
                for i in file_:
                    name_base, extension = os.path.splitext(i.name)
                    description_ = i.content_type
                    file_ = i
                    file_instance = MedicalCertificate(
                    name = name_,
                    description=description_,
                    file = file_,
                    guardian_id = guardian_instance,
                    student_id = student_instance
                    )
                    file_instance.save()
                    file_instance.name = f"{student_instance.user.get_full_name()} - Certificado Médico - {file_instance.created_at.strftime('%Y-%m-%d %H:%M:%S')}{extension}"
                    file_instance.save()
                return Response({'created': 'created'}, status=status.HTTP_201_CREATED)

          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class ListMedicalCertificateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, student_rut, *args, **kwargs):
        if (self.request.user.rol == 'apoderado'):
            try:
                queryset_ = []
                guardian_instance = Guardian.objects.get(user__pk=self.request.user.id)
                student_instance = Student.objects.get(rut = student_rut)
                archivos = MedicalCertificate.objects.all().filter(student_id = student_instance)
                for archivo in archivos:
                    queryset_.append({
                        'id': archivo.pk,
                        'name': archivo.name,
                        'description': archivo.description,
                        'created_at': archivo.created_at
                    })
                return Response(queryset_, status=status.HTTP_200_OK)
            except (ValidationError, KeyError, Student.DoesNotExist) as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Guardian.DoesNotExist:
                return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
            except ParseError as e:
                return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
                raise PermissionDenied


class DeleteMedicalCertificateView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]

     def delete(self, request, file_id, *args, **kwargs):
        if (self.request.user.rol == 'apoderado'):
          if Guardian.objects.filter(user__pk=self.request.user.id).exists():

            queryset = MedicalCertificate.objects.get(pk= file_id)
            queryset.delete()
            return Response({'Delete': 'Archivo Eliminado'}, status=status.HTTP_200_OK)
          else:
             raise PermissionDenied
        else:
            raise PermissionDenied


class EditFileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MedicalCertificateSerializer

    def patch(self, request, file_id, *args, **kwargs):
 
     if (self.request.user.rol == 'apoderado'):
        try:
                file_edit = MedicalCertificate.objects.get(pk=file_id)
                guardian_instance = Guardian.objects.get(user__pk=self.request.user.id)

                name_ = request.data.get('name')
                description_ = request.data.get('description')

                file_edit.name = name_
                file_edit.description = description_
                file_edit.save()
                return Response({'updated': 'update'}, status=status.HTTP_200_OK)

        except (ValidationError, KeyError, Guardian.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied



class DownloadFileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MedicalCertificateSerializer
    def get(self, request, file_id, *args, **kwargs):
     if (self.request.user.rol == 'apoderado'):

          if Guardian.objects.filter(user__pk=self.request.user.id ).exists():
           try:
                file_get = MedicalCertificate.objects.get(pk=file_id)
                response = FileResponse(file_get.file)
                response['Content-Disposition'] = f'attachment; filename="{file_get.file.name}"'
                response['Content-Type'] = file_get.description
                return response


           except (ValidationError, KeyError, Guardian.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
           except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
           except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
          else:
                raise PermissionDenied
  
     else:
                raise PermissionDenied

class GetMedicalCertificateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, file_id, *args, **kwargs):
        if (self.request.user.rol == 'apoderado'):
            try:
                queryset_ = []
                archivo = MedicalCertificate.objects.get(pk = file_id)
                queryset_.append({
                        'id': archivo.pk,
                        'name': archivo.name,
                        'description': archivo.description,
                        'created_at': archivo.created_at
                    })
                return Response(queryset_, status=status.HTTP_200_OK)
            except (ValidationError, KeyError, Student.DoesNotExist) as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Guardian.DoesNotExist:
                return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
            except ParseError as e:
                return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
                raise PermissionDenied







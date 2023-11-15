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
from backend.apps.professor.models import Professor
from backend.apps.student.models import Student
from backend.apps.section.models import Section
from backend.apps.student_section.models import StudentSection
from backend.apps.notification.models import Notification
from .models import Folder, File
#Serializer
from .serializers import FolderSerializer, FileSerializer


class CreateFolderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FolderSerializer

    def post(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
          try:
            section_instance = Section.objects.get(pk=section_id)
            professor_instance = Professor.objects.get(user=self.request.user.id)

            name_ = request.data.get('name')
            description_ = request.data.get('description')
            print(section_instance, professor_instance, name_, description_)

            folder_instance = Folder(
            name = name_,
            description=description_,
            professor_id=professor_instance,
            section_id=section_instance 
            )
            folder_instance.save()

            return Response({'created': 'created'}, status=status.HTTP_201_CREATED)

          except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
          except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
          except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class CreateFileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, folder_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
          try:
            professor_instance = Professor.objects.get(user=request.user.id)
            folder_instance = Folder.objects.get(pk=folder_id)

            query_dict = request.data
            file_list = query_dict.getlist('files[]')
            for i in file_list:
                name_ = i.name
                description_ = i.content_type
                file_ = i
                file_instance = File(
                    folder_id = folder_instance,
                    name = name_,
                    description=description_,
                    file = file_
                    )
                file_instance.save()

            section_instance = Section.objects.get(pk = folder_instance.section_id.pk)
            users_instance = StudentSection.objects.all().filter(section_id = section_instance.pk)
            for user_ in users_instance:
                      noti_instance = Notification(
                           user = user_.student_rut.user,
                           type = 1,
                           issue = 'Asignatura:'+section_instance.subject.name+' - Se han compartido nuevos archivos.',
                           message = professor_instance.user.get_full_name()+' ha ingresado nuevos archivos.'
                           )
                      noti_instance.save()
            

            

            return Response({'created': 'created'}, status=status.HTTP_201_CREATED)

          except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
          except Section.DoesNotExist as e:
            print(e)
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
          except ParseError as e:
            print(e)
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class FolderListView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):

            queryset_ = []
            professor_instance = Professor.objects.get(user=self.request.user.id)
            carpetas= Folder.objects.all().filter(section_id = section_id, professor_id = professor_instance)

            for carpeta in carpetas:
                data_to_send = {
                    'Folder':{
                        'id':carpeta.pk,
                        'name': carpeta.name,
                        'description': carpeta.description,
                        'status': carpeta.status,
                        'created_at': carpeta.created_at
                    },
                    'Files': [],
                }
                archivos = File.objects.all().filter(folder_id = carpeta)
                for archivo in archivos:
                    file ={
                        'file':{
                        'id':archivo.pk,
                        'name': archivo.name,
                        'description': archivo.description,
                        'status': archivo.status,
                        'created_at': archivo.created_at
                        },
                    }
                    data_to_send['Files'].append(file)
                queryset_.append(data_to_send)

   

            return Response(queryset_, status=status.HTTP_200_OK)

        elif (self.request.user.rol == 'estudiante'):
            student_instance = Student.objects.get(user=self.request.user.id)
            if StudentSection.objects.filter(student_rut = student_instance, section_id =section_id ).exists():
                queryset_ = []
                section = section_id
                carpetasGroup = Folder.objects.all().filter(section_id = section, status="Publicado")
                
                for carpeta in carpetasGroup:
                    data_to_send = {
                    'Folder':{
                        'id':carpeta.pk,
                        'name': carpeta.name,
                        'description': carpeta.description,
                        'status': carpeta.status,
                        'created_at': carpeta.created_at
                    },
                    'Files': [],
                }
                    archivos = File.objects.all().filter(folder_id = carpeta, status="Publicado")
                    for archivo in archivos:
                      file ={
                        'file':{
                        'id':archivo.pk,
                        'name': archivo.name,
                        'description': archivo.description,
                        'status': archivo.status,
                        'created_at': archivo.created_at
                        },
                    }
                      data_to_send['Files'].append(file)
                    queryset_.append(data_to_send)
                

                return Response(queryset_, status=status.HTTP_200_OK)

            else:
                raise PermissionDenied
            
            
        else:
                raise PermissionDenied


class FolderDeactivateView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]

     def delete(self, request, folder_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
          if Professor.objects.filter(user=self.request.user.id).exists():

            queryset = Folder.objects.get(pk= folder_id)
            if (queryset.status == 'Oculto'):
                queryset.status = 'Publicado'
            elif (queryset.status == 'Publicado'):
                queryset.status = 'Oculto'
            queryset.save()
            return Response({'Deactivate': 'Objeto Desactivado'}, status=status.HTTP_200_OK)
          else:
             raise PermissionDenied
        else:
            raise PermissionDenied


class FileDeactivateView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]

     def delete(self, request, file_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
          if Professor.objects.filter(user= self.request.user.id).exists():

            queryset = File.objects.get(pk= file_id)
            if (queryset.status == 'Oculto'):
                queryset.status = 'Publicado'
            elif (queryset.status == 'Publicado'):
                queryset.status = 'Oculto'
            queryset.save()


            return Response({'Deactivate': 'Objeto Desactivado'}, status=status.HTTP_200_OK)

          else:
            raise PermissionDenied
        else:
            raise PermissionDenied


class EditFolderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FolderSerializer
    parser_classes = (MultiPartParser, FormParser)

    def patch(self, request, folder_id, *args, **kwargs):
 
     if (self.request.user.rol == 'profesor'):
        try:
                folder_edit = Folder.objects.get(pk=folder_id)

                name_ = request.data.get('name')
                description_ = request.data.get('description')

                folder_edit.name = name_
                folder_edit.description = description_
                folder_edit.save()
                return Response({'updated': 'update'}, status=status.HTTP_200_OK)

        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied



class EditFileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer

    def patch(self, request, file_id, *args, **kwargs):
 
     if (self.request.user.rol == 'profesor'):
        try:
                file_edit = File.objects.get(pk=file_id)

                name_ = request.data.get('name')
                description_ = request.data.get('description')

                file_edit.name = name_
                file_edit.description = description_
                file_edit.save()
                return Response({'updated': 'update'}, status=status.HTTP_200_OK)

        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied


class FolderDeleteView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]

     def delete(self, request, folder_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
          if Professor.objects.filter(user=self.request.user.id).exists():

            queryset = Folder.objects.get(pk= folder_id)
            queryset.delete()


            return Response({'Delete': 'Carpeta Eliminada'}, status=status.HTTP_200_OK)

          else:
            raise PermissionDenied
        else:
            raise PermissionDenied


class FileDeleteView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]

     def delete(self, request, file_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
          if Professor.objects.filter(user=self.request.user.id).exists():

            queryset = File.objects.get(pk= file_id)
            queryset.delete()


            return Response({'Deactivate': 'Archivo Eliminado'}, status=status.HTTP_200_OK)

          else:
            raise PermissionDenied
        else:
            raise PermissionDenied


class GetFolderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FolderSerializer
    def get(self, request, folder_id, *args, **kwargs):
     if (self.request.user.rol == 'profesor'):
        try:
                folder_get = Folder.objects.get(pk=folder_id)

                respuesta = {
                'name': folder_get.name,
                'description': folder_get.description,
            }
                
                return Response(respuesta, status=status.HTTP_200_OK)


        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied


class GetFileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer
    def get(self, request, file_id, *args, **kwargs):
     if (self.request.user.rol == 'profesor'):
        try:
                file_get = File.objects.get(pk=file_id)

                respuesta = {
                'name': file_get.name,
                'description': file_get.description,
                'status': file_get.status,
                'created_': file_get.created_at,
                'folder':file_get.folder_id.name,
            }
                
                return Response(respuesta, status=status.HTTP_200_OK)


        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied



class DownloadFileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer
    def get(self, request, file_id, *args, **kwargs):
     if (self.request.user.rol == 'profesor'):

          if Professor.objects.filter(user=self.request.user.id ).exists():
           try:
                file_get = File.objects.get(pk=file_id)
                response = FileResponse(file_get.file)
                response['Content-Disposition'] = f'attachment; filename="{file_get.file.name}"'
                response['Content-Type'] = file_get.description
                return response


           except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
           except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
           except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
           except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
          else:
                raise PermissionDenied
     
     elif (self.request.user.rol == 'estudiante'):
      if Student.objects.filter(user=self.request.user.id ).exists():
        try:
                file_get = File.objects.get(pk=file_id)
                response = FileResponse(file_get.file)
                response['Content-Disposition'] = f'attachment; filename="{file_get.file.name}"'
                response['Content-Type'] = file_get.description
                return response


        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
      else:
                raise PermissionDenied
     else:
                raise PermissionDenied







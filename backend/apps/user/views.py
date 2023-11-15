from rest_framework import viewsets, status
from django.contrib.auth import get_user_model
from .serializer import UserCreateSerializer, CustomTokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from django.db import transaction
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate, update_session_auth_hash
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.generics import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import ListAPIView, UpdateAPIView,CreateAPIView,DestroyAPIView
from django.core.exceptions import (
    PermissionDenied,
)
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
#Serializer
from .serializer import UTPSerializer, UserAccountSerializer, AvatarUpdateSerializer, UserPartialUpdateSerializer, DirectorSerializer, InspectorSerializer, SecretarySerializer
#Models
from .models import UserAccount, Inspector, Director, Secretary, UTP
from backend.apps.professor.models import Professor
from backend.apps.student.models import Student
from backend.apps.guardian.models import Guardian
from backend.apps.administrator.models import AdminProfile
from backend.apps.school.models import school

import pandas as pd
import xlwt
from django.http import HttpResponse


User = UserAccount

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    @transaction.atomic
    def perform_create(self, serializer):
        user = serializer.save()
        rol = self.request.data.get('rol')

        if rol not in ('profesor', 'apoderado', 'estudiante'):
            return Response({'error': 'Rol no válido'}, status=status.HTTP_400_BAD_REQUEST)

        if rol == 'profesor':
            pass
        elif rol == 'apoderado':
            pass
        elif rol == 'estudiante':
            pass

        return Response({'message': 'Usuario creado con éxito'}, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        if request.method == 'PATCH':
            self.serializer_class = UserPartialUpdateSerializer
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserAccountCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserAccountSerializer

    def get_queryset(self):
        if self.request.user.rol == "administrador":
            queryset = UserAccount.objects.all()
            return queryset
        else:
            raise PermissionDenied

class UserAccountListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserAccountSerializer

    def get_queryset(self):
        if self.request.user.rol == "administrador":
            queryset = UserAccount.objects.all()
            return queryset
        else:
            raise PermissionDenied

class UserAccountUpdateAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserAccountSerializer

    def put(self, request, *args, **kwargs):
        if self.request.user.rol == "administrador":
            return self.update(request, *args, **kwargs)
        else:
            raise PermissionDenied

class UserAccountDestroyAPIView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserAccountSerializer
    queryset = UserAccount.objects.all()

    def delete(self, request, *args, **kwargs):
        if self.request.user.rol == "administrador":
            return self.destroy(request, *args, **kwargs)
        else:
            raise PermissionDenied


class AvatarUpdateView(UpdateAPIView):
    serializer_class = AvatarUpdateSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request, format=None):
        serializer = AvatarUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UploadImageView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AvatarUpdateSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return UserAccount.objects.get(pk=pk)
        except UserAccount.DoesNotExist:
            raise Http404
    
    def put(self, request, *args, **kwargs):
        user = self.get_object(self.request.user.id)  
        serializer = self.get_serializer(user, data=request.data) 

        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAvatarView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AvatarUpdateSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return UserAccount.objects.get(pk=pk)
        except UserAccount.DoesNotExist:
            raise Http404
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_object(self.request.user.id)  
        serializer = self.get_serializer(queryset) 
        return Response(serializer.data)


class DeactivateUserView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = UserAccountSerializer

     def delete(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 queryset = UserAccount.objects.get(pk = user_id)
                 if (queryset.is_active == True):
                      queryset.is_active = False
                 queryset.save()
                 return Response({'Deactivate': 'Objeto Desactivado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
             raise PermissionDenied
        
class ActivateUserView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = UserAccountSerializer

     def delete(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 queryset = UserAccount.objects.get(pk = user_id)
                 if (queryset.is_active == False):
                      queryset.is_active = True
                 queryset.save()
                 return Response({'Activate': 'Objeto Activado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
             raise PermissionDenied
        


#======================Director==============================
class ListDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 directors = Director.objects.all().filter(school = admin_instance.school)
                 queryset = []
                 for user in directors:
                      data_to_send = {
                           'User':{
                                'id':user.user.pk,
                                'name': user.user.get_full_name(),
                                'email': user.user.email,
                                'school': user.school.name,
                                'status': user.user.is_active
                                },
                       }
                      queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
                 

class CreateDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)

                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )

                 user_instance = UserAccount(
                      first_name = request.data['first_name'],
                      last_name = request.data['last_name'],
                      email = request.data['email'],
                      rol = 'director',
                      password = password_
                 )
                 user_instance.save()

                 director_instance = Director(
                      user = user_instance,
                      school = school_instance
                 )
                 director_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def put(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 
                 user_instance = UserAccount.objects.get(pk = user_id)
                 user_instance.first_name = request.data['first_name']
                 user_instance.last_name = request.data['last_name']
                 user_instance.email = request.data['email']
                 user_instance.password = password_
                 user_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def get(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 user = Director.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'school': user.school.rbd,
                                'status': user.user.is_active
     
                       }
                 
                 queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        


#======================Inspector==============================
class ListInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Inspector

    def get(self, request,  *args, **kwargs):
        if self.request.user.rol in ['administrador','director']:
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 inspectors = Inspector.objects.all().filter(school = admin_instance.school)
                 queryset = []
                 for user in inspectors:
                      data_to_send = {
                           'User':{
                                'id':user.user.pk,
                                'name': user.user.get_full_name(),
                                'email': user.user.email,
                                'school': user.school.name,
                                'status': user.user.is_active
                                },
                       }
                      queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
                 

class CreateInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InspectorSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)

                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )

                 user_instance = UserAccount(
                      first_name = request.data['first_name'],
                      last_name = request.data['last_name'],
                      email = request.data['email'],
                      rol = 'inspector',
                      password = password_
                 )
                 user_instance.save()

                 inspector_instance = Inspector(
                      user = user_instance,
                      school = school_instance
                 )
                 inspector_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InspectorSerializer

    def put(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 
                 user_instance = UserAccount.objects.get(pk = user_id)
                 user_instance.first_name = request.data['first_name']
                 user_instance.last_name = request.data['last_name']
                 user_instance.email = request.data['email']
                 user_instance.password = password_
                 user_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InspectorSerializer

    def get(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 user = Inspector.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'school': user.school.rbd,
                                'status': user.user.is_active
     
                       }
                 
                 queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
#======================Secretary==============================
class ListSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SecretarySerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 directors = Secretary.objects.all().filter(school = admin_instance.school)
                 queryset = []
                 for user in directors:
                      data_to_send = {
                           'User':{
                                'id':user.user.pk,
                                'name': user.user.get_full_name(),
                                'email': user.user.email,
                                'school': user.school.name,
                                'status': user.user.is_active
                                },
                       }
                      queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
                 

class CreateSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SecretarySerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)

                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )

                 user_instance = UserAccount(
                      first_name = request.data['first_name'],
                      last_name = request.data['last_name'],
                      email = request.data['email'],
                      rol = 'secretario',
                      password = password_
                 )
                 user_instance.save()

                 secretary_instance = Secretary(
                      user = user_instance,
                      school = school_instance
                 )
                 secretary_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def put(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 
                 user_instance = UserAccount.objects.get(pk = user_id)
                 user_instance.first_name = request.data['first_name']
                 user_instance.last_name = request.data['last_name']
                 user_instance.email = request.data['email']
                 user_instance.password = password_
                 user_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def get(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 user = Secretary.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'school': user.school.rbd,
                                'status': user.user.is_active
     
                       }
                 
                 queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
#======================UTP==============================
class ListUTPView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer

    def get(self, request,  *args, **kwargs):
        if self.request.user.rol in ['administrador','director']:
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 utps = UTP.objects.all().filter(school = admin_instance.school)
                 queryset = []
                 for user in utps:
                      data_to_send = {
                           'User':{
                                'id':user.user.pk,
                                'name': user.user.get_full_name(),
                                'email': user.user.email,
                                'school': user.school.name,
                                'status': user.user.is_active
                                },
                       }
                      queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
                 

class CreateUTPView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)

                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )

                 user_instance = UserAccount(
                      first_name = request.data['first_name'],
                      last_name = request.data['last_name'],
                      email = request.data['email'],
                      rol = 'UTP',
                      password = password_
                 )
                 user_instance.save()

                 utp_instance = UTP(
                      user = user_instance,
                      school = school_instance
                 )
                 utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditUTPView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer

    def put(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 
                 user_instance = UserAccount.objects.get(pk = user_id)
                 user_instance.first_name = request.data['first_name']
                 user_instance.last_name = request.data['last_name']
                 user_instance.email = request.data['email']
                 user_instance.password = password_
                 user_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetUTPView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer

    def get(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 user = UTP.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'school': user.school.rbd,
                                'status': user.user.is_active
     
                       }
                 
                 queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class UploadUTPView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'UTP',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = UTP(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadUTPView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_UTP.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('UTP')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = UTP.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class UploadInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InspectorSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'inspector',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = Inspector(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InspectorSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Inspector.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Inspector')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = Inspector.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class UploadSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SecretarySerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'secretario',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = Secretary(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SecretarySerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Secretary.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Secretarios')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = Secretary.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class UploadDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Director
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'director',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = Director(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Director.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Director')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = Director.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class UploadUTPView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'UTP',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = UTP(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadUTPView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UTPSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_UTP.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('UTP')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = UTP.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class UploadInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InspectorSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'inspector',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = Inspector(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadInspectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InspectorSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Inspector.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Inspector')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = Inspector.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class UploadSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SecretarySerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'secretario',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = Secretary(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadSecretaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SecretarySerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Secretary.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Secretarios')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = Secretary.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class UploadDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Director
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:

                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 file = request.data['File']
                 data = pd.read_excel(file)
                 df = pd.DataFrame(data)

                 for item in df.itertuples():
                      nombre_ = str(item[1])
                      apellido_ = str(item[2])
                      email_ = str(item[3])
                      password_ = str(item[4])


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'director',
                      password = password_
                      )
                      user_instance.save()
                      
                      utp_instance = Director(
                      user = user_instance,
                      school = school_instance
                      )
                      utp_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadDirectorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DirectorSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Director.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Director')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 UTP_data = Director.objects.all()
                 for utp in UTP_data:
                      row_num += 1
                      ws1.write(row_num, 0, utp.user.first_name)
                      ws1.write(row_num, 1, utp.user.last_name)
                      ws1.write(row_num, 4, utp.user.email)
                      ws1.write(row_num, 5, utp.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class directorDash(ListAPIView):
    def get(self, request, *args, **kwargs):
        professors = Professor.objects.all()
        utps = UTP.objects.all()
        inspectors = Inspector.objects.all()

        professor_data = self.get_user_data(professors, 'professor')
        utp_data = self.get_user_data(utps, 'utp')
        inspector_data = self.get_user_data(inspectors, 'inspector')

        return Response({
            'professors': professor_data,
            'utps': utp_data,
            'inspectors': inspector_data
        })

    def get_user_data(self, users, user_type):
        user_list = []

        for user in users:
            # Verifica si el usuario está activo antes de agregarlo a la lista
            if user.user.is_active:
                user_data = {
                    'id': user.user.id,
                    'name': f"{user.user.first_name} {user.user.last_name}",
                    'email': user.user.email,
                    'school': {
                        'name': user.school.name,
                        'status': user.school.is_active,
                    }
                }
                user_list.append(user_data)

        return user_list
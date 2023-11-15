from django.shortcuts import render
from rest_framework import viewsets
from .models import AdminProfile
from .serializers import AdminProfileSerializer
from rest_framework import generics
from rest_framework import generics
from django.core.exceptions import (
    PermissionDenied,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.hashers import make_password
from backend.apps.user.models import UserAccount
from backend.apps.school.models import school
from .models import AdminProfile

from backend.apps.student.models import Student
from backend.apps.professor.models import Professor
from backend.apps.guardian.models import Guardian
from backend.apps.user.models import Director, Inspector, Secretary, UTP


class AdminProfileViewSet(viewsets.ModelViewSet):
    queryset = AdminProfile.objects.all()
    serializer_class = AdminProfileSerializer



class ListAdminView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AdminProfileSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
            try:
                 admins = AdminProfile.objects.all()
                 queryset = []
                 for user in admins:
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
                 

class CreateAdminView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AdminProfileSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
            try:
                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = request.data['school'] )

                 user_instance = UserAccount(
                      first_name = request.data['first_name'],
                      last_name = request.data['last_name'],
                      email = request.data['email'],
                      rol = request.data['rol'],
                      password = password_
                 )
                 user_instance.save()

                 admin_instance = AdminProfile(
                      user = user_instance,
                      school = school_instance
                 )
                 admin_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        
class DeactivateAdminView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]

     def delete(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
            try:
                 queryset = UserAccount.objects.get(pk = user_id)
                 if (queryset.is_active == True):
                      queryset.is_active = False
                 queryset.save()
                 return Response({'Deactivate': 'Objeto Desactivado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
             raise PermissionDenied
        
class ActivateAdminView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]

     def delete(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
            try:
                 queryset = UserAccount.objects.get(pk = user_id)
                 if (queryset.is_active == False):
                      queryset.is_active = True
                 queryset.save()
                 return Response({'Activate': 'Objeto Activado'}, status=status.HTTP_200_OK)
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
             raise PermissionDenied
        
class EditAdminView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AdminProfileSerializer

    def put(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
            try:
                 password_ = make_password(request.data['password'])
                 school_instance = school.objects.get(rbd = request.data['school'] )
                 
                 user_instance = UserAccount.objects.get(pk = user_id)
                 user_instance.first_name = request.data['first_name']
                 user_instance.last_name = request.data['last_name']
                 user_instance.email = request.data['email']
                 user_instance.password = password_
                 user_instance.save()
                 admin_instance = AdminProfile.objects.get(user = user_instance)
                 admin_instance.school = school_instance
                 admin_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetAdminView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AdminProfileSerializer

    def get(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
            try:
                 user = AdminProfile.objects.get(user__pk= user_id)
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
                 print(queryset)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class DashboardAdminView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AdminProfileSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk=self.request.user.id)
                 school_insance = school.objects.get(rbd = admin_instance.school.rbd)
                 n_student = Student.objects.all().filter(school = school_insance, user__is_active = True).count()
                 n_guardian = Guardian.objects.all().filter(school = school_insance, user__is_active = True).count()
                 n_professor = Professor.objects.all().filter(school = school_insance, user__is_active = True).count()
                 n_utp = UTP.objects.all().filter(school = school_insance, user__is_active = True).count()
                 n_inspector = Inspector.objects.all().filter(school = school_insance, user__is_active = True).count()
                 n_secretary = Secretary.objects.all().filter(school = school_insance, user__is_active = True).count()
                 n_Director = Director.objects.filter(school = school_insance, user__is_active = True ).first()

                 queryset = []
                 data_to_send = {
                      'n_student': n_student,
                      'n_guardian': n_guardian,
                      'n_professor': n_professor,
                      'n_utp': n_utp,
                      'n_inspector': n_inspector,
                      'n_secretary': n_secretary,
                      'school': school_insance.name,
                      'director_name': n_Director.user.get_full_name()
                       }
                 
                 queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
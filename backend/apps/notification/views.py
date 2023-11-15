from django.shortcuts import render
from rest_framework import viewsets, status
from django.contrib.auth import get_user_model
from .serializers import NotificationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from django.db import transaction
from rest_framework.generics import *
from django.db.models import Q

from django.core.exceptions import (
    PermissionDenied,
)
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from backend.apps.user.models import UserAccount
from backend.apps.section.models import Section
from backend.apps.student_section.models import StudentSection

ROLES = ['estudiante', 'profesor', 'apoderado', 'UTP', 'secretario', 'inspector', 'director', 'administrador', 'superuser']
TYPES = {1:'Informativo', 2:'Alerta', 3:'Evento', 4:'Actualización', 5:'Recordatorio', 6:'Social', 7:'Error'}

#======================Notification==============================
class ListNotificationView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol in ROLES):
            try:
                 user_instance = UserAccount.objects.get(pk = self.request.user.id)
                 Notifications = Notification.objects.all().filter(user = user_instance).order_by('-id')
                 queryset = []
                 for noti in Notifications:
                      data_to_send = {
                           'Notis':{
                                'id':noti.pk,
                                'type': TYPES[noti.type],
                                'issue': noti.issue,
                                'message': noti.message,
                                'seen': noti.seen,
                                'created_at': noti.created_at
                                },
                       }
                      queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
                 
class ListNotificationResumeView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol in ROLES):
            try:
                 user_instance = UserAccount.objects.get(pk = self.request.user.id)
                 Notifications = Notification.objects.all().filter(user = user_instance).filter(Q(type=2)|Q(type=1)|Q(type=3)|Q(type=6)|Q(type=4)|Q(type=5)|Q(type=7)).order_by('-id')[:3]
                 queryset = []
                 for noti in Notifications:
                      queryset.append({
                                'id':noti.pk,
                                'type': TYPES[noti.type],
                                'issue': noti.issue,
                                'message': noti.message,
                                'seen': noti.seen,
                                'created_at': noti.created_at
                                },)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied

class CreateNotificationView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol in ROLES):
            try:
                
                 user_instance = UserAccount.objects.get(pk = self.request.user.id)
                 type_ = request.data['type']
                 issue_ = request.data['issue']
                 message_ = request.data['message']
                 noti_instance = Notification(
                    user = user_instance,
                    type = type_,
                    issue = issue_,
                    message = message_
                 )
                 noti_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

class SeenNotificationView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = NotificationSerializer

     def delete(self, request, notification_id, *args, **kwargs):
        if (self.request.user.rol in ROLES):
            try:
                 queryset = Notification.objects.get(pk = notification_id)
                 if (queryset.seen == False):
                      queryset.seen = True
                 queryset.save()
                 return Response({'Seen': 'Objeto Leído'}, status=status.HTTP_200_OK)
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
             raise PermissionDenied
        

class CreateNotificationSectionView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def post(self, request, section_id,  *args, **kwargs):
         if (self.request.user.rol in ROLES):
              try:
                 type_ = request.data['type']
                 issue_ = request.data['issue']
                 message_ = request.data['message']
                 section_instance = Section.objects.get(pk = section_id)
                 users_instance = StudentSection.objects.all().filter(section_id = section_id)
                 for user_ in users_instance:
                      noti_instance = Notification(
                           user = user_.student_rut.user,
                           type = type_,
                           issue = section_instance.name+' '+issue_,
                           message = message_
                           )
                      noti_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
              except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
         else:
                raise PermissionDenied



class CreateNotificationToView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def post(self, request, user_id,  *args, **kwargs):
         if (self.request.user.rol in ROLES):
              try:
                 type_ = request.data['type']
                 issue_ = request.data['issue']
                 message_ = request.data['message']
                 user_instance = UserAccount.objects.get(pk = user_id)

                 type_ = request.data['type']
                 issue_ = request.data['issue']
                 message_ = request.data['message']
                 
                 noti_instance = Notification(
                    user = user_instance,
                    type = type_,
                    issue = issue_,
                    message = message_
                 )
                 noti_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
              except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
         else:
                raise PermissionDenied


class UpdateNotificationsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def patch(self, request, *args, **kwargs):
        user_instance = request.user
        try:
            Notification.objects.filter(user=user_instance, seen=False).update(seen=True)
            return Response({"status": "Notificaciones actualizadas"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
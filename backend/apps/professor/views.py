# DRF imports
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
# Django imports
from django.contrib.auth import get_user_model
from django.db import transaction
from django.core.exceptions import (
    PermissionDenied,
)
from django.http import HttpResponse, Http404
from django.contrib.auth.hashers import make_password
#Serializer
from .serializers import (
     ProfessorSerializer, 
     AvailableTimeModelSerializer, 
     ProfessorSerializer2, 
     NotificationModelSerializer
     )
from django.db.models import Q
from django.shortcuts import get_object_or_404

#Models
from .models import Professor
from backend.apps.administrator.models import AdminProfile
from backend.apps.school.models import school
from backend.apps.user.models import UserAccount
from backend.apps.schedule.models import Schedule
from backend.apps.section.models import Section
import pandas as pd
import xlwt
from django.http import HttpResponse
from backend.apps.guardian.models import Available_times, Meeting_request, Guardian
from backend.apps.student_section.models import StudentSection as StSn
from backend.apps.student.models import Student
from rest_framework.generics import ListAPIView, UpdateAPIView,CreateAPIView,DestroyAPIView
from backend.apps.subject.models import subject
from backend.apps.course.models import Course
from backend.apps.forum.models import Forum, PostForum, ForumComment, ForumSubComment
from backend.apps.notification.models import Notification
# Python imports
from datetime import date, datetime, timedelta
import pytz

AUTHORIZED = ["administrador", "profesor", "director"]

#======================Professor==============================
class ProfessorDashboard(APIView):
     permission_classes = [IsAuthenticated]

     def get(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
              """
               SELECT * FROM public."Meeting_request" AS mt 
               WHERE mt.id_available_time IN (
                    SELECT atime.id_available_time FROM public."Available_times" AS atime
                    WHERE atime.professor_rut IN (
                         SELECT prof.professor_rut FROM public.Professor AS prof
                         WHERE prof.user_id = 11
                    )
               );
              """
              professorId = request.user.id

              professorObj = get_object_or_404(Professor, user__pk = professorId)
              times_related = Available_times.objects.filter(professor_rut = professorObj).values_list('id_available_time')
              await_meetings_related = Meeting_request.objects.filter(
                   id_available_time__in = times_related,
                   status = "2",
                   dateSelected = date.today()
                   ).count()
              confirmed_meetings_related = Meeting_request.objects.filter(
                   id_available_time__in = times_related,
                   status = "1",
                   dateSelected = date.today()
                   ).count()
              
              # Get the closest next class
              sectionsRelated = Section.objects.filter(
                   professor_rut = professorObj,
                   period__start_time_period__lte = date.today(),
                   period__end_time_period__gte = date.today()
                   ).values_list('section_id')

              closestSchedule= Schedule.objects.filter(
                   is_active = True,
                   section__in = sectionsRelated,
                   day_of_week = datetime.today().weekday() + 1,
                   start_time_block__gte = datetime.now().time()
              ).order_by('start_time_block').first()

              # Forum Activity
              
              forums_related = Forum.objects.filter(section_id__in = sectionsRelated).values_list('pk')
              post_forums_related = PostForum.objects.filter(forum_id__in = forums_related).values_list('pk')

              oneDay = timedelta(days=1)
              fourDays = timedelta(days=4)
              now = datetime.now()
              day = datetime(
                   now.year,
                   now.month,
                   now.day,
                   tzinfo=pytz.timezone('Chile/Continental')
              )
              day = day - fourDays

              x_axe = []
              y_axe = []
              for n in range(0,5,1):
                   comments_related = ForumComment.objects.filter(
                        postforum_id__in = post_forums_related,
                        created_at__date = day
                        ).count()
                   
                   x_axe.append(day.strftime("%d-%m-%Y"))
                   y_axe.append(comments_related)
                   day = day + oneDay

              # Notifications
              professorNotifications = Notification.objects.filter(
                   user = professorId
              )
              print(professorNotifications)
              notify_list = []
              for noti in professorNotifications:
                   notify_list.append({
                        "type": noti.type,
                        "issue": noti.issue,
                        "message": noti.message,
                        "seen": noti.seen,
                        "created_at": noti.created_at
                   })

              if(closestSchedule is not None):
                   sectionObj = Section.objects.get(pk = closestSchedule.section.pk)
                   course_related = Course.objects.get(pk = sectionObj.course.pk)
                   result = [{
                       "nAwaiting": await_meetings_related,
                       "nConfirmed": confirmed_meetings_related,
                       "closestClass": f'{course_related.nivel} {sectionObj.name}',
                       "graph": {
                            "dates": x_axe,
                            "comments": y_axe
                       },
                       "notifications":notify_list
                    }]
                   
              else:
                   result = [{
                       "nAwaiting": await_meetings_related,
                       "nConfirmed": confirmed_meetings_related,
                       "closestClass": None,
                       "graph": {
                            "dates": x_axe,
                            "comments": y_axe
                       },
                        "notifications":notify_list
                    }]
                   

              return Response(result, status=status.HTTP_200_OK)

         else:
              raise PermissionDenied





class ListProfessorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfessorSerializer

    def get(self, request,  *args, **kwargs):
        if (request.user.rol in AUTHORIZED):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 utps = Professor.objects.all().filter(school = admin_instance.school)
                 queryset = []
                 for user in utps:
                      data_to_send = {
                           'User':{
                                'id':user.user.pk,
                               'rut':user.professor_rut,
                               'phone': user.phone,
                                'name': user.user.get_full_name(),
                                'email': user.user.email,
                                'school': user.school.name,
                                'status': user.user.is_active
                                },
                       }
                      queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
                 

class CreateProfessorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfessorSerializer

    def post(self, request,  *args, **kwargs):
        if (request.user.rol in AUTHORIZED):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)

                 password_ = make_password(request.data['rut'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )

                 user_instance = UserAccount(
                      first_name = request.data['first_name'],
                      last_name = request.data['last_name'],
                      email = request.data['email'],
                      rol = 'profesor',
                      password = password_
                 )
                 user_instance.save()

                 professor_instance = Professor(
                      user = user_instance,
                      school = school_instance,
                      professor_rut = request.data['rut'],
                      phone = request.data['phone']
                 )
                 professor_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditProfessorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfessorSerializer

    def put(self, request, user_id, *args, **kwargs):
        if (request.user.rol in AUTHORIZED):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 password_ = make_password(request.data['rut'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                 
                 user_instance = UserAccount.objects.get(pk = user_id)
                 user_instance.first_name = request.data['first_name']
                 user_instance.last_name = request.data['last_name']
                 user_instance.email = request.data['email']
                 user_instance.password = password_
                 user_instance.save()

                 profesor_instance = Professor.objects.get(user = user_instance)
                 profesor_instance.phone = request.data['phone']
                 profesor_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetProfessorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfessorSerializer

    def get(self, request, user_id, *args, **kwargs):
        if (request.user.rol in AUTHORIZED):
            try:
                 user = Professor.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'rut':user.professor_rut,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'phone': user.phone,
                                'school': user.school.rbd,
                                'status': user.user.is_active
     
                       }
                 
                 queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class UploadProfessorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfessorSerializer
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
                      rut_ = str(item[3])
                      telefono_ = str(item[4])
                      email_ = str(item[5])
                      password_ = make_password(str(item[3]))


                      user_instance = UserAccount(
                      first_name = nombre_,
                      last_name = apellido_,
                      email = email_,
                      rol = 'profesor',
                      password = password_
                      )
                      user_instance.save()
                      
                      professor_instance = Professor(
                      user = user_instance,
                      school = school_instance,
                      professor_rut = rut_,
                      phone = telefono_
                      )
                      professor_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadProfessorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfessorSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Profesores.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Profesores')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'RUT', 'Teléfono', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 professor_data = Professor.objects.all()
                 for professor in professor_data:
                      row_num += 1
                      ws1.write(row_num, 0, professor.user.first_name)
                      ws1.write(row_num, 1, professor.user.last_name)
                      ws1.write(row_num, 2, professor.professor_rut)
                      ws1.write(row_num, 3, professor.phone)
                      ws1.write(row_num, 4, professor.user.email)
                      ws1.write(row_num, 5, professor.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        

# Available_time's API's

class NewAvailableTime(APIView):
     permission_classes = [IsAuthenticated]

     def post(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
              professorId = request.data["professorId"]
              day_of_week = request.data["day_of_week"]
              start_time_block = request.data["start_time_block"]
              end_time_block = request.data["end_time_block"]

              # Getting professor object
              try:
                  professorObj = get_object_or_404(Professor, user__pk = professorId)
              except Http404:
                  return Response(data={"error":"Error en la búsqueda"}, status=status.HTTP_400_BAD_REQUEST)
              
              newObj = Available_times(
                   professor_rut  = professorObj,
                   day_of_week = day_of_week,
                   start_time_block = start_time_block,
                   end_time_block = end_time_block
              )

              newObj.save()

              return Response("Creado correctamente", status=status.HTTP_200_OK)

         else:
              raise PermissionDenied

class ListAvailableTime(APIView):
     
     def get(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
              professorId = self.kwargs["professorId"]
              section_id = self.kwargs["section_id"]

              # Getting students of this section
              studentsRelated = StSn.objects.filter(section_id = section_id).values_list('student_rut')
              # Getting guardians of this section
              guardiansRelated = Student.objects.filter(pk__in = studentsRelated).values_list('guardian_rut')

              queryset = Available_times.objects.filter(is_active = True)\
                    .filter(professor_rut__user__pk = professorId)
              
              result = []
              for time in queryset:
                # number of meeting requests
                num_rq = Meeting_request.objects.filter(is_active=True)\
                    .filter(
                         id_available_time = time.pk,
                         guardian_rut__in = guardiansRelated
                         )\
                         .filter(Q(status="2") | Q(status="1"))\
                              .count() 

                result.append({
                    "id_available_time": time.id_available_time,
                    "verbose_day": time.get_day_of_week_display(),
                    "day": time.day_of_week,
                    "init": time.start_time_block,
                    "fin": time.end_time_block,
                    "requests": num_rq
               })
              return Response(result, status=status.HTTP_200_OK)
         else:
              raise PermissionDenied

class AvailableTimeDetails(APIView):
     permission_classes = [IsAuthenticated]

     def get(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
              availableTimeId = self.kwargs["availableTimeId"]
              section_id = self.kwargs["section_id"]

              # Getting students of this section
              studentsRelated = StSn.objects.filter(section_id = section_id).values_list('student_rut')
              # Getting guardians of this section
              guardiansRelated = Student.objects.filter(pk__in = studentsRelated).values_list('guardian_rut')

              # This Query only get meetings requests wich status is equal to "Confirmada" or "En espera"
              meeting_related = Meeting_request.objects.filter(
                   is_active = True,
                   id_available_time = availableTimeId,
                   guardian_rut__in = guardiansRelated

              ).filter(Q(status="1") | Q(status="2")).order_by('dateSelected').order_by('timeSelected')

              result = []

              for mr in meeting_related:
                   guardianObj = get_object_or_404(Guardian, pk = mr.guardian_rut.pk)
                   guardianUser = get_object_or_404(UserAccount, pk = guardianObj.user.pk)

                   result.append({
                        "id_meeting_request": mr.id_meeting_request,
                        "guardian_name": guardianUser.get_full_name(),
                        "dateSelected": mr.dateSelected.strftime("%d-%m-%Y"),
                        "timeSelected": mr.timeSelected,
                        "status": mr.get_status_display()
                   })
               

              return Response(result, status=status.HTTP_200_OK)
         
         else:
              raise PermissionDenied

class UpdateAvailableTime(generics.UpdateAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = AvailableTimeModelSerializer
     queryset = Available_times.objects.all()

     lookup_field = 'pk'

     def put(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
              return super().put(request, *args, **kwargs)
         else:
              raise PermissionDenied
         
     def patch(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):               
             return super().patch(request, *args, **kwargs)
         else:
              raise PermissionDenied

class DeactiveAvailableTime(generics.DestroyAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = AvailableTimeModelSerializer
     queryset = Available_times.objects.all()

     lookup_field = 'pk'

     def delete(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
              available_time_instance = Available_times.objects.get(pk = self.kwargs["pk"])
              meetings_related = Meeting_request.objects.filter(id_available_time = self.kwargs["pk"] )
              for mr in meetings_related:
                   mr.status = "3" # 3 == Cancelada
                   mr.save()
              available_time_instance.is_active = False
              available_time_instance.save()

              return HttpResponse("Desactivado correctamente", content_type="text/plain")
         else:
              raise PermissionDenied

# Meeting Request API's

class CancelMeetingRequest(APIView):
     """
          This class allows to professors to change their meeting 
          request's status field to "Cancelada" value
     """

     def delete(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
               # Catching URL parameters
               meetReqId = self.kwargs["pk"]
               try:
                    meeting_instance = get_object_or_404(Meeting_request, pk = meetReqId)
               except Http404:
                    return Response(data={"error":"Error en la búsqueda"}, status=status.HTTP_400_BAD_REQUEST)
               
               if(meeting_instance.id_available_time.professor_rut.user.pk == request.user.id):
                    meeting_instance.status = "3"
                    meeting_instance.save()
               else:
                    raise PermissionDenied

               return Response("Cancelada correctamente", status=status.HTTP_200_OK)

         else:
              raise PermissionDenied

class AcceptMeetingRequest(APIView):

     """
          This class allows to professors to change their meeting 
          request's status field to "Confirmada" value
     """

     permission_classes = [IsAuthenticated]

     def get(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
               # Catching URL parameters
               meetReqId = self.kwargs["pk"]
               try:
                    meeting_instance = get_object_or_404(Meeting_request, pk = meetReqId)
               except Http404:
                    return Response(data={"error":"Error en la búsqueda"}, status=status.HTTP_400_BAD_REQUEST)
               
               if(meeting_instance.id_available_time.professor_rut.user.pk == request.user.id):
                    meeting_instance.status = "1"
                    meeting_instance.save()
               else:
                    raise PermissionDenied

               return Response("Confirmada correctamente", status=status.HTTP_200_OK)
         else:
              raise PermissionDenied

# Notifications
class ProfessorNotifications(ListAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = NotificationModelSerializer

     def get_queryset(self):
         if(self.request.user.rol in AUTHORIZED):
              professorNotifications = Notification.objects.filter(
                   user = self.request.user.id
              )
              return professorNotifications
         else:
              raise PermissionDenied
     


class ProfessorListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfessorSerializer2

    def get_queryset(self):

        return Professor.objects.all()
         

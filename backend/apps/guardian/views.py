#Serializers
from backend.apps.student.serializers import StudentSerializer

#Models
from backend.apps.student.models import Student
from backend.apps.course.models import Course
from backend.apps.student_attendance.models import StudentAttendance
from backend.apps.subject.models import subject
from backend.apps.user.models import UserAccount
from backend.apps.weighted_average.models import weighted_average
from backend.apps.students_grades.models import student_grades
from django.db.models import Prefetch
from django.http import JsonResponse
from django.http import HttpResponse

from django.shortcuts import render
from django.views import View

from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import generics
from django.db import transaction
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework.generics import *
import tempfile
import os
from datetime import datetime
from backend.apps.medical_certificate.models import MedicalCertificate
from backend.apps.student_section.models import StudentSection


from rest_framework.parsers import MultiPartParser, FormParser
from decimal import Decimal
from django.core.exceptions import (
    PermissionDenied,
    ObjectDoesNotExist
)
from rest_framework.generics import ListAPIView
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
import pandas as pd
import xlwt
#Serializer
from .serializers import *
from backend.apps.student.serializers import StudentSerializer

#Models
from .models import *
from backend.apps.weighted_average.models import weighted_average
from backend.apps.students_grades.models import student_grades
from backend.apps.student_attendance.models import StudentAttendance
from backend.apps.student_observations.models import student_observations
from backend.apps.schedule.models import Schedule
from backend.apps.section.models import Section
from backend.apps.student.models import Student
from backend.apps.administrator.models import AdminProfile
from backend.apps.school.models import school
from backend.apps.user.models import UserAccount
from backend.apps.student.models import Student
from backend.apps.student_section.models import StudentSection as StSn
from backend.apps.course.models import Course
from backend.apps.section.models import Section, Academic_Period
from backend.apps.professor.models import Professor
from backend.apps.subject.models import subject as Subject
from backend.apps.shared_files.models import File, Folder

# Python imports
from datetime import date, datetime, timedelta

# SECURITY CONSTANT
AUTHORIZED = ["apoderado", "administrador"]


AUTHORIZED = ["apoderado"]

#======================Guardian==============================
class ListGuardianView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 utps = Guardian.objects.all().filter(school = admin_instance.school)
                 queryset = []
                 for user in utps:
                      data_to_send = {
                           'User':{
                                'id':user.user.pk,
                               'rut':user.guardian_rut,
                               'phone': user.phone,
                                'name': user.user.get_full_name(),
                                'email': user.user.email,
                                'address': user.address,
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
                 

class CreateGuardianView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)

                 password_ = make_password(request.data['rut'])
                 school_instance = school.objects.get(rbd = admin_instance.school.rbd )

                 user_instance = UserAccount(
                      first_name = request.data['first_name'],
                      last_name = request.data['last_name'],
                      email = request.data['email'],
                      rol = 'apoderado',
                      password = password_
                 )
                 user_instance.save()

                 Guardian_instance = Guardian(
                      user = user_instance,
                      school = school_instance,
                      guardian_rut = request.data['rut'],
                      address = request.data['address'],
                      phone = request.data['phone']
                 )
                 Guardian_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditGuardianView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer

    def put(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
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

                 profesor_instance = Guardian.objects.get(user = user_instance)
                 profesor_instance.phone = request.data['phone']
                 profesor_instance.address = request.data['address']
                 profesor_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetGuardianView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer

    def get(self, request, user_id, *args, **kwargs):
        if self.request.user.rol == 'administrador' or self.request.user.rol == 'apoderado':

            try:
                 user = Guardian.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'rut':user.guardian_rut,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'phone': user.phone,
                                'address': user.address,
                                'status': user.user.is_active
     
                       }
                 
                 queryset.append(data_to_send)
                 print(queryset)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif (self.request.user.rol == 'apoderado'):
               try:
                 user = Guardian.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'rut':user.guardian_rut,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'phone': user.phone,
                                'address': user.address,
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
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_students_for_guardian(request, guardian_rut):
    try:
        # Asegúrate de que el usuario autenticado sea un apoderado
        if request.user.rol == 'Apoderado':
            return Response({'error': 'No tienes permisos para acceder a esta información.'}, status=403)

        print("Guardian Rut recibido:", guardian_rut)  # Imprimimos el valor para verificar en la consola

        # Asegúrate de que el apoderado exista antes de obtener los estudiantes
        
        # Obtén los estudiantes asociados a este apoderado
        students = Student.objects.filter(guardian_rut=guardian_rut)

        # Formatea la respuesta (serialización)
        serialized_students = StudentSerializer(students, many=True)

        return Response({'students': serialized_students.data})
        
    except Student.DoesNotExist:
        return Response({'error': 'No se encontraron estudiantes para este apoderado.'}, status=404)
    except Guardian.DoesNotExist:
        return Response({'error': 'No se encontró el apoderado.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
# Class-based View
class getStudentsDetails(APIView):
     permission_classes = [IsAuthenticated]

     def get(self, request, *args, **kwargs):
         if(request.user.rol in AUTHORIZED):
            guardianId = self.kwargs["guardian_id"]
            guardian_instance = Guardian.objects.get(user__pk = guardianId)
            # Getting all my active students
            myStudents = Student.objects.filter(user__is_active = True)\
                .filter(guardian_rut = guardian_instance.pk)\
                        .distinct("rut")

            result = []

            for student in myStudents:

                stSections = StSn.objects.filter(student_rut = student.pk).values_list('section_id')
                sections = Section.objects.filter(section_id__in = stSections).values_list('course')
                try:
                    course = get_object_or_404(Course, pk__in = sections) # This query must return only one single instance
                    course_and_section = Section.objects.filter(course = course.pk).values('course__nivel', 'name')
                except Http404:
                    course_and_section = [{}]
                    course_and_section[0]["course__nivel"] = "sin"
                    course_and_section[0]["name"] = "curso"

                user_instance = UserAccount.objects.get(pk = student.user.pk)

                result.append({
                    "student_user_id": user_instance.pk,
                    "student_rut": student.pk,
                    "full_name": user_instance.get_full_name(),
                    "course_full_name": f'{course_and_section[0]["course__nivel"]} {course_and_section[0]["name"]}'
                })
            
            return Response(result, status=status.HTTP_200_OK)

         else:
            raise PermissionDenied
         
# Class-Based View
class getProfessorsOfStudent(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            student_user_id = self.kwargs["stid"]
            # Getting user instance
            user_instance = UserAccount.objects.get(pk = student_user_id)
            # Getting student instance
            student_instance = Student.objects.get(user__id = user_instance.pk)
            # acquiring professors
            sections_related = StSn.objects.filter(student_rut = student_instance.pk).values_list("section_id")
            section_objs = Section.objects.filter(section_id__in = sections_related).values_list("professor_rut")

            professors = Professor.objects.filter(professor_rut__in = section_objs)

            # Obtaining subject info
            """
            SELECT sub.name AS Asignatura FROM public.subject AS sub
            WHERE sub.id_subject IN (
                SELECT sn.subject FROM public.section AS sn WHERE sn.section_id IN (
                    SELECT st_sn.section_id FROM public.student_section AS st_sn WHERE st_sn.student_rut = '20637999-9'
                ) AND sn.professor_rut = '19369369-9'
            );
            """
            section_ids_related = StSn.objects.filter(student_rut = student_instance.pk).values_list("section_id")

            result = []

            for professor in professors:
                # Getting user instance
                professor_user = UserAccount.objects.get(pk = professor.user.pk)

                
                subject_ids_related = Section.objects.filter(section_id__in = section_ids_related).filter(professor_rut=professor.pk).values_list("subject")
                subject_objs = Subject.objects.filter(id_subject__in = subject_ids_related).values_list("name")

                result.append({
                    "professor_rut": professor.pk,
                    "professor_name": professor_user.get_full_name(),
                    "user": professor.user.pk,
                    "phone": professor.phone,
                    "school": professor.school.pk,
                    "subjects": subject_objs
                })

            return Response(result, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied

class GetForMeetingRequest(APIView):
    """
        Returns to a get request, a list with the teacher's information 
        and their availability times
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            # Catching URL parameters
            student_user_id = self.kwargs["stuid"]
            professor_user_id = self.kwargs["puid"]

            professor_user_instance = get_object_or_404(UserAccount, pk = professor_user_id)
            # Getting object instances
            student_instance = Student.objects.get(user__pk = student_user_id)

            professor_instance = Professor.objects.get(user__pk = professor_user_id)

            # Seek subjects related
            # Obtaining subject info

            students_sections_id = StSn.objects.filter(is_active = True)\
                .filter(student_rut = student_instance.pk)\
                    .values_list('section_id')

            subject_ids = Section.objects.filter(is_active= True)\
                    .filter(section_id__in = students_sections_id)\
                        .filter(professor_rut = professor_instance.pk)\
                            .values_list('subject')
            
            subject_objs = Subject.objects.filter(is_active = True)\
                    .filter(pk__in = subject_ids)

            subject_list = []

            for subject in subject_objs:
                subject_list.append(subject.name)

            # Getting available times of professor

            today = date.today() # yyyy-mm-dd format

        
            # Step by 1 day
            oneDay = timedelta(days=1)
            # Finish when rise the end of academic period
            # Current academic period
            # This Query should be checked by QA 
            currentAP = Academic_Period.objects.filter(
                    start_time_period__lte = today,
                    end_time_period__gte = today
                ).first()
            
            """
            SELECT atime.day_of_week FROM public."Available_times" AS atime 
            WHERE atime.id_available_time NOT IN (
                SELECT mtrq.id_available_time FROM public."Meeting_request" AS mtrq
                WHERE date = '2023-11-07'
            );
            """
            # Obtaining available times
            professorTimes = Available_times.objects.filter(is_active=True)\
                .filter(professor_rut = professor_instance.pk)


            available_details = []
            date_list = []

            # if(currentAP != None):
            for t in range(0, len(professorTimes), 1):
                # Start from here on out
                start_date = today
                available_details.append({
                    "day_of_week": professorTimes[t].get_day_of_week_display(),
                    "start_time": professorTimes[t].start_time_block,
                    "end_time": professorTimes[t].end_time_block
                })
                while(start_date != currentAP.end_time_period):
                    if(start_date.weekday() == (professorTimes[t].day_of_week - 1)):
                        date_list.append(start_date)
                    else:
                        pass

                    start_date = start_date + oneDay

                # END while

                # END For

            # else:
            #     pass


            result = [{
                "professor_full_name": professor_user_instance.get_full_name(),
                # "professor_avatar": professor_user_instance.avatar,
                "subjects": subject_list,
                "date_list": date_list,
                "available_details": available_details
            }]


            return Response(result, status = status.HTTP_200_OK)

        else: 
            raise PermissionDenied

class MakeMeetingRequest(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            # Getting info
            dateSelected = request.data["date"]
            timeSelected = request.data["time"]
            guardianId = request.data["guardianId"]
            professorId = request.data["professorId"]

            # Obtaining instances
            guardianObj = Guardian.objects.get(user__pk = guardianId)
            professorObj = Professor.objects.get(user__pk = professorId)

            # Making a Date instance
            dateObj = datetime.strptime(dateSelected, "%Y-%m-%d")
            timeObj = datetime.strptime(timeSelected, "%H:%M")

            #Getting the first result that matches the search
            aTime = Available_times.objects.filter(is_active = True)\
                .filter(
                    professor_rut = professorObj.pk,
                    day_of_week = (dateObj.weekday() + 1),
                    start_time_block__lte = timeObj.time(),
                    end_time_block__gte = timeObj.time()
                ).first()
            
            
            # Creating a new meeting request
            if(aTime != None):
                newMRequest = Meeting_request(
                    id_available_time = aTime,
                    guardian_rut = guardianObj,
                    dateSelected = dateSelected,
                    timeSelected = timeSelected
                )
                newMRequest.save()
                return Response('success',status=status.HTTP_200_OK)
            else:
                return Response(data={"message":'Time selected is not avaialable'}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            raise PermissionDenied

class ListMeetingRequest(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            guardianId = self.kwargs["guardianId"]
            professorId = self.kwargs["professorId"]

            # Getting Guardian Instance
            try:
                guardianObj = get_object_or_404(Guardian, user__pk = guardianId)
                professorObj = get_object_or_404(Professor, user__pk = professorId)
            except Http404:
                return Response(data={"error": "Error en la búsqueda"})
            
            meetingR = Meeting_request.objects.filter(
                is_active = True,
                guardian_rut = guardianObj.pk,
                id_available_time__professor_rut = professorObj.pk
            ).order_by('-dateSelected')

            result = []

            for mr in meetingR:
                result.append({
                    "id_meeting_request": mr.pk,
                    "day_of_week": mr.id_available_time.get_day_of_week_display(),
                    "dateSelected": mr.dateSelected.strftime("%d-%m-%Y"),
                    "timeSelected": mr.timeSelected,
                    "status": mr.get_status_display()
                })

            return Response(result, status=status.HTTP_200_OK)

        else:
            raise PermissionDenied

class CancelMeetGuardian(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MeetingRequestSerializer
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            return super().patch(request, *args, **kwargs)
        else:
            raise PermissionDenied
        
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_grades_by_rut(request, rut):
    if request.user.rol == 'Apoderado':
        return Response({'error': 'No tienes permisos para acceder a esta información.'}, status=403)

    try:
        # Filtra las calificaciones por el RUT del estudiante
        grades = student_grades.objects.filter(student_rut__rut=rut).select_related('section_id__subject')

        # Lista para almacenar los resultados
        grades_data = []

        # Obtener el nombre de la asignatura a través de las relaciones ForeignKey
        for grade in grades:
            subject_name = grade.section_id.subject.name

            # Agregar los datos al resultado
            grades_data.append({
                'asignatura': subject_name,
                'nota': float(grade.student_grade),
                'coeficiente': grade.coefficient,
            })

        return JsonResponse({'notas': grades_data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_name_by_rut(request, rut):
    try:
        # Busca al estudiante por su RUT
        student = get_object_or_404(Student, rut=rut)

        # Obtiene el nombre completo del estudiante
        full_name = str(student)

        return JsonResponse({'full_name': full_name})
    except Student.DoesNotExist:
        # Maneja el caso en el que no se encuentra al estudiante
        return JsonResponse({'error': 'Estudiante no encontrado'}, status=404)
    except Exception as e:
        # Maneja cualquier otra excepción que pueda ocurrir aquí
        return JsonResponse({'error': str(e)}, status=500)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_absent_days_for_student(request, student_rut):
    try:
        # Filtra las asistencias del estudiante por su RUT y que estén marcadas como ausente (attendance=0)
        absent_days = StudentAttendance.objects.filter(student_rut=student_rut, attendance=0).values_list('full_date', flat=True)

        # Convierte los objetos fecha en una lista de cadenas de texto
        absent_days_list = [str(day) for day in absent_days]

        return Response({'absent_days': absent_days_list})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


####HARE UNA PRUEBA ACA 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generar_certificado(request, rut_estudiante):

        if request.user.rol == 'Apoderado':
            return Response({'error': 'No tienes permisos para acceder a esta información.'}, status=403)
        try:
            estudiante = Student.objects.get(rut=rut_estudiante)
            apoderado = estudiante.guardian_rut

            buffer = io.BytesIO()
            p = canvas.Canvas(buffer)
            p.drawString(100, 750, f"Certificado para {estudiante.user.get_full_name()}")
            p.drawString(100, 730, f"RUT: {estudiante.rut}")
            p.drawString(100, 710, f"Fecha: {timezone.now().strftime('%d/%m/%Y')}")
            p.drawString(100, 690, f"Apoderado: {apoderado.user.get_full_name()}")
            p.showPage()
            p.save()

            buffer.seek(0)
            return FileResponse(buffer, as_attachment=True, filename='certificado.pdf')
        except Student.DoesNotExist:
            return Response({'error': 'Estudiante no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            print (e)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_certificate(request, student_id):
    try:
        # Obtener detalles del estudiante (ajusta según tu modelo de Student)
        student = Student.objects.get(pk=student_id)

        # Crear un objeto de respuesta en PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="certificado_{student_id}.pdf"'

        # Crear el PDF usando reportlab
        pdf_buffer = generate_certificate_pdf(student)

        # Agregar el contenido del PDF a la respuesta
        response.write(pdf_buffer.getvalue())
        pdf_buffer.close()

        return response

    except Student.DoesNotExist:
        return Response({'error': 'Estudiante no encontrado'}, status=404)

class CertificatePDFView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        # Obtén el estudiante del frontend (puedes pasar datos a través de la URL o del cuerpo de la solicitud)
        student_name = request.GET.get('student_name', 'Estudiante Desconocido')

        # Crear un buffer para almacenar el PDF
        buffer = BytesIO()

        # Crear el documento PDF usando reportlab
        p = canvas.Canvas(buffer)
        p.drawString(100, 800, f'Certificado para: {student_name}')
        # Agregar más contenido según tus necesidades

        # Finalizar el documento PDF
        p.showPage()
        p.save()
    
        buffer.seek(0)

        # Devolver el PDF como respuesta
        response = HttpResponse(FileResponse(buffer), content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="certificado.pdf"'

        return response
    
class DownloadFile(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, file_id, *args, **kwargs):
        try:
            file_get = File.objects.get(pk=file_id)

            if request.user.rol == 'apoderado' and Guardian.objects.filter(user=request.user.id).exists():
                # Lógica específica para apoderados
                self.check_permissions(file_get)

            else:
                raise PermissionDenied

            response = FileResponse(file_get.file)
            response['Content-Disposition'] = f'attachment; filename="{file_get.file.name}"'
            response['Content-Type'] = file_get.description
            return response

        except (ValidationError, Http404, ParseError) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def check_permissions(self, file_obj):
        # Lógica de permisos específica para apoderados
        # Puedes personalizar esta lógica según tus requerimientos
        if not file_obj.allowed_for_guardians:
            raise PermissionDenied('No tienes permiso para descargar este archivo como apoderado.')




class UploadGuardView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer
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
                      direccion_ = str(item[4])
                      telefono_ = str(item[5])
                      email_ = str(item[6])
                      password_ = make_password(str(item[3]))


                      user_instance = UserAccount(
                           first_name = nombre_,
                           last_name = apellido_,
                           email = email_,
                           rol = 'apoderado',
                           password = password_
                           )
                      user_instance.save()

                      Guardian_instance = Guardian(
                           user = user_instance,
                           school = school_instance,
                           guardian_rut = rut_,
                           address = direccion_,
                           phone = telefono_
                           )
                      Guardian_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadGuardianView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Apoderados.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Apoderados')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'RUT', 'Dirección', 'Teléfono', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 guardian_data = Guardian.objects.all()
                 for guard in guardian_data:
                      row_num += 1
                      ws1.write(row_num, 0, guard.user.first_name)
                      ws1.write(row_num, 1, guard.user.last_name)
                      ws1.write(row_num, 2, guard.guardian_rut)
                      ws1.write(row_num, 3, guard.address)
                      ws1.write(row_num, 4, guard.phone)
                      ws1.write(row_num, 5, guard.user.email)
                      ws1.write(row_num, 6, guard.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class myStudentsCertificateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'apoderado'):
            try:
                 guardian_instance = Guardian.objects.get(user__id = self.request.user.id)
                 student_lists = Student.objects.all().filter(guardian_rut = guardian_instance.guardian_rut, user__is_active = True)
                 queryset = []
                 for student in student_lists:
                      lista = []
                      archivos = MedicalCertificate.objects.all().filter(student_id = student)
                      for archivo in archivos:
                           lista.append({
                                'id': archivo.pk, 
                                'name': archivo.name,
                                'description': archivo.description,
                                'status': archivo.status,
                                'created_at': archivo.created_at
                           })
                      queryset.append({
                           'id': student.user.pk,
                           'rut': student.rut,
                           'name': student.user.get_full_name(),
                           'email': student.user.email,
                           'certificates': lista

                      })
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied


class myStudentsForumView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GuardianSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'apoderado'):
            try:
                 guardian_instance = Guardian.objects.get(user__id = self.request.user.id)
                 student_lists = Student.objects.all().filter(guardian_rut = guardian_instance.guardian_rut, user__is_active = True)
                 queryset = []
                 for student in student_lists:
                      lista = []
                      sections = StudentSection.objects.all().filter(student_rut = student)
                      for section in sections:
                           lista.append({
                                'id': section.section_id.pk, 
                                'course': section.section_id.course.nivel,
                                'asignatura': section.section_id.subject.name,
                                'professor': section.section_id.professor_rut.user.get_full_name()
                           })
                      queryset.append({
                           'id': student.user.pk,
                           'rut': student.rut,
                           'name': student.user.get_full_name(),
                           'email': student.user.email,
                           'sections': lista

                      })
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        

@api_view(['GET'])
def get_student_subjects_and_grades(request, guardian_id):
    if (request.user.rol == 'apoderado'):
        try:
            # Obtenemos al apoderado con el guardian_id
            guardian = Guardian.objects.get(pk=guardian_id)
            
            # Obtenemos todos los estudiantes relacionados con ese apoderado
            students = Student.objects.filter(guardian_rut=guardian.guardian_rut)
            
            # Inicializamos un diccionario para almacenar las calificaciones por asignatura
            subject_grades = {}
            
            # Recorremos los estudiantes y obtenemos sus calificaciones
            for student in students:
                grades = student_grades.objects.filter(student_rut=student.rut)
                for grade in grades:
                    subject_name = grade.id_weighted_average.subject_name
                    student_grade = grade.student_grade
                    
                    # Agregamos la calificación al diccionario de asignaturas
                    if subject_name in subject_grades:
                        subject_grades[subject_name].append(student_grade)
                    else:
                        subject_grades[subject_name] = [student_grade]
            
            # Calculamos el promedio de calificaciones por asignatura
            for subject_name, grades_list in subject_grades.items():
                average_grade = sum(grades_list) / len(grades_list)
                subject_grades[subject_name] = average_grade
            
            # Devolvemos la información en formato JSON
            response_data = {
                'subjects_count': len(subject_grades),
                'subject_grades': subject_grades,
            }
            return Response(response_data)
        except Guardian.DoesNotExist:
            return Response({'error': 'Apoderado no encontrado'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
@api_view(['GET'])
def get_students_by_utp(request):
    if request.user.rol != 'UTP':
        return JsonResponse({'error': 'Acceso restringido. Solo para UTP.'}, status=403)

    try:
        utp = UTP.objects.get(user=request.user)
        courses = Course.objects.filter(school=utp.school)

        student_ruts = set()

        for course in courses:
            try:
                sections = Section.objects.filter(course=course)
                student_sections = StudentSection.objects.filter(section_id__in=sections)

                for ss in student_sections:
                    student_ruts.add(ss.student_rut.rut)

            except Exception as inner_e:
                print(f"Error al procesar el curso {course.id_course}: {inner_e}")

        students = Student.objects.filter(rut__in=student_ruts).select_related('user')

        response_data = [
            {
                'rut': student.rut,
                'full_name': student.user.get_full_name(),
                'course_level': student.studentsection_set.first().section_id.course.nivel,
                'course_id': student.studentsection_set.first().section_id.course.id_course,
            }
            for student in students
        ]

        return JsonResponse(response_data, safe=False)

    except UTP.DoesNotExist:
        return JsonResponse({'error': 'UTP asociado al usuario no encontrado.'}, status=404)
    except Exception as e:
        print(f"Error en get_students_by_utp: {e}")
        return JsonResponse({'error': str(e)}, status=500)

    
@api_view(['GET'])
def get_students(request, id_course=None):
    if request.user.rol != 'UTP':
        return Response({'error': 'Acceso restringido. Solo para UTP.'}, status=403)

    try:
        # Encuentra al UTP basado en el usuario que inició sesión
        utp = UTP.objects.get(user=request.user)
        
        # Si se ha proporcionado un id_course, filtra por ese curso específico
        if id_course:
            courses = [Course.objects.get(id_course=id_course, school=utp.school)]
        else:
            # Si no se ha proporcionado un id_course, obtén todos los cursos de la escuela del UTP
            courses = Course.objects.filter(school=utp.school)

        response_data = []
        for course in courses:
            students = Student.objects.filter(school=course.school).select_related('user')
            course_students = [
                {
                    'rut': student.rut,
                    'full_name': student.user.get_full_name(),
                    'course_level': course.nivel,
                    'course_id': course.id_course,
                }
                for student in students
            ]
            response_data.extend(course_students)

        return Response(response_data)

    except Course.DoesNotExist:
        return Response({'error': 'Curso no encontrado.'}, status=404)
    except UTP.DoesNotExist:
        return Response({'error': 'UTP asociado al usuario no encontrado.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

       
class StudentsByGuardianView(generics.GenericAPIView):
    def get(self, request, guardian_rut):
        try:
            students = Student.objects.filter(guardian_rut=guardian_rut)
            student_data = [
                {
                    'rut': student.rut,
                    'user': {
                        'email': student.user.email,
                        'first_name': student.user.first_name,
                        'last_name': student.user.last_name,
                    }
                }
                for student in students
            ]
            return Response(student_data)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StudentAttendancePercentage(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, student_id):
        if request.user.rol == 'apoderado':
            try:
                student = Student.objects.get(pk=student_id)
                attendances = StudentAttendance.objects.filter(student_rut=student.pk, is_active=True)
                total_attendances = attendances.count()
                attendance_count = attendances.filter(attendance=1).count()
                absence_count = total_attendances - attendance_count

                if total_attendances > 0:
                    # Utilizamos la función round para redondear al entero más cercano
                    attendance_percentage = round((attendance_count * 100) / total_attendances)
                else:
                    attendance_percentage = 0

                data = {
                    "student_name": student.user.get_full_name(),
                    "attendance_count": attendance_count,
                    "absence_count": absence_count,
                    "attendance_percentage": attendance_percentage
                }

                return JsonResponse(data)

            except Student.DoesNotExist:
                return JsonResponse({"error": "El estudiante no existe"}, status=404)

        else:
            return JsonResponse({"error": "Permiso denegado"}, status=403)
        

class StudentGradesInfoView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, student_id):
        try:
            student_sections = StudentSection.objects.filter(student_rut=student_id, is_active=True)
            section_averages = []
            total_weighted_sum = Decimal(0)
            total_weighted_coefficients = Decimal(0)
            total_student_note_count = 0

            for student_section in student_sections:
                grades = student_grades.objects.filter(student_rut=student_id, section_id=student_section.section_id, is_active=True)
                total_weighted_sum_section = Decimal(0)
                total_weighted_coefficients_section = Decimal(0)
                total_student_note_count_section = 0

                for grade in grades:
                    weighted_avg = weighted_average.objects.get(id_weighted_average=grade.id_weighted_average.id_weighted_average)

                    total_weighted_sum_section += grade.student_grade * grade.coefficient
                    total_weighted_coefficients_section += grade.coefficient
                    total_student_note_count_section += 1

                section_average = round(total_weighted_sum_section / total_weighted_coefficients_section, 1) if total_weighted_coefficients_section > 0 else Decimal(0)

                section_averages.append({
                    'section_id': student_section.section_id.section_id,
                    'section_name': student_section.section_id.name,
                    'promedio_ponderado_seccion': section_average,
                    'cantidad_notas': total_student_note_count_section,
                })

                total_weighted_sum += total_weighted_sum_section
                total_weighted_coefficients += total_weighted_coefficients_section
                total_student_note_count += total_student_note_count_section

            student_general_average = round(total_weighted_sum / total_weighted_coefficients, 1) if total_weighted_coefficients > 0 else Decimal(0)

            response_data = {
                'student_id': student_id,
                'promedio_general_estudiante': student_general_average,
                'secciones': section_averages,
            }

            return JsonResponse(response_data)

        except ObjectDoesNotExist:
            return JsonResponse({"error": "El estudiante no existe"}, status=404)
        

class StudentObsCourseIdView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, student_id):
        if request.user.rol in AUTHORIZED:
            try:
                student = Student.objects.get(rut=student_id)
                user = student.user
            except Student.DoesNotExist:
                return JsonResponse({'error': 'El estudiante no existe.'}, status=404)

            student_sections = StudentSection.objects.filter(student_rut=student)
            section_ids = student_sections.values_list('section_id', flat=True)
            
            schedules = Schedule.objects.filter(section__section_id__in=section_ids, is_active=True)
            section_ids = schedules.values_list('section__section_id', flat=True)
            
            observations = student_observations.objects.filter(
                rut_student=student,
                id_schedule__section__section_id__in=section_ids,
                is_active=True
            )

            positive_annotations = observations.filter(type_observation='positiva').count()
            negative_annotations = observations.filter(type_observation='negativa').count()
            total_annotations = positive_annotations + negative_annotations

            positive_percentage = 0 if total_annotations == 0 else round((positive_annotations / total_annotations) * 100)
            negative_percentage = 0 if total_annotations == 0 else round((negative_annotations / total_annotations) * 100)

            result = {
                'id_student': student.rut,
                'nombre_estudiante': f'{user.get_full_name()}',
                'total_anotaciones': total_annotations,
                'anotaciones_positivas': positive_annotations,
                'anotaciones_negativas': negative_annotations,
                'porcentaje_anotaciones_positivas': positive_percentage,
                'porcentaje_anotaciones_negativas': negative_percentage,
            }

            return Response(result)
        else:
            raise PermissionDenied

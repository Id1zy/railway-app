# DRF Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
#Django Imports
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse, Http404, JsonResponse
# Models
from rest_framework.views import APIView
from django.db.models import Sum, Case, When, IntegerField
from .models import StudentAttendance as StModel
from .models import StudentAttendance 
from backend.apps.student_section.models import StudentSection
from backend.apps.student.models import Student
from backend.apps.subject.models import subject
from backend.apps.user.models import UserAccount as User
from django.contrib.auth import get_user_model
from backend.apps.schedule.models import Schedule 
from backend.apps.subject.models import subject 
from backend.apps.section.models import Section, Academic_Period
from backend.apps.course.models import Course
from rest_framework import viewsets, status

# Serializers
from .serializers import (
    StudentAttendanceModelSerializer, 
    StudentAttendanceSerializer,
    StudentAttendanceOfDateSerializer
    )

# Python imports
from datetime import timedelta,date, datetime
from decimal import Decimal

AUTHORIZED = ["profesor", "estudiante", "director"]

class StudentAttendanceGET(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentAttendanceModelSerializer

    def post(self,request, schedule_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            # try:
            print(request.data["date"])
            dateSelected = str(request.data["date"]).strip()
            section = request.data['section_id']

            if dateSelected is None or section is None:
                return Response({'error': 'Date and section are required.'}, status=status.HTTP_400_BAD_REQUEST)
            
            schedule_instance = Schedule.objects.get(pk=schedule_id)
            validate = StModel.objects.all().filter(full_date = dateSelected).count()
            students = StudentSection.objects.all()\
                .filter(section_id = section)\
                    .order_by('student_rut__user__last_name')
            queryset = []

            if validate == 0:

                for i in students:
                    currentSt = get_object_or_404(Student, pk=i.student_rut.rut)
                    user = get_object_or_404(User, pk = currentSt.user.pk)
                    queryset.append({
                        'Estudiante': user.get_full_name(),
                        'RUT': i.student_rut.rut,
                        'Estado': False
                    })
                return Response(queryset, status=status.HTTP_200_OK)
            
            else:
                for i in students:
                    user = get_object_or_404(User, pk = i.student_rut.user.pk)
                    try:
                        stStudent = get_object_or_404(StModel,                         
                            schedule_id = schedule_instance, 
                            full_date = dateSelected,
                            student_rut = i.student_rut.rut
                            )
                        queryset.append({
                            'Estudiante': user.get_full_name(),
                            'RUT': i.student_rut.rut,
                            'Estado': stStudent.attendance
                        })
                    except Http404:
                        queryset.append({
                            'Estudiante': user.get_full_name(),
                            'RUT': i.student_rut.rut,
                            'Estado': False
                        })

                return Response(queryset, status=status.HTTP_200_OK)

                 
            # except Schedule.DoesNotExist:
            #     return Response({'error': 'Schedule not found.'}, status=status.HTTP_404_NOT_FOUND)
            # except Exception as e:
            #     print(e)
            #     return Response({'error': 'An error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
               return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

        
class StudentAttendanceCreate(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentAttendanceModelSerializer

    def post(self,request, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            try:
                 section = request.data['section_id']
                 schedule = request.data['schedule_id']
                 list = request.data['list']

                 for i in list:
                     for clave, valor in i.items():
                         student_rut_ = clave
                         checked = valor
                         student_instance = Student.objects.get(rut = student_rut_)
                         schedule_instance = Schedule.objects.get(pk = schedule)
                         attendance_instance = StModel(
                             student_rut = student_instance,
                             schedule_id = schedule_instance,
                             attendance = 1 if checked else 0
                         )
                         attendance_instance.save()

                 return Response({'Created': 'Creado'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied

class StudentAttendanceEdit(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentAttendanceModelSerializer

    def put(self,request, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            try:
                 section = request.data['section_id']
                 schedule = request.data['schedule_id']
                 date = request.data['date']
                 list = request.data['list']

                 print(section, schedule, date, list)

                 for i in list:
                     for clave, valor in i.items():
                         print('Paso 1')
                         student_rut_ = clave
                         checked = valor
                         student_instance = Student.objects.get(rut = student_rut_)
                         schedule_instance = Schedule.objects.get(pk = schedule)
                         if StModel.objects.filter(full_date =date, student_rut = student_instance).exists():
                             print('Paso 2')
                             attendance_instance = StModel.objects.get(full_date =date, student_rut = student_instance)
                             attendance_instance.attendance = 1 if checked else 0
                             attendance_instance.save()
                             print(attendance_instance)
                         else:
                             print('Paso 3')
                             attendance_instance = StModel(
                             student_rut = student_instance,
                             schedule_id = schedule_instance,
                             attendance = 1 if checked else 0,
                             )
                             attendance_instance.full_date = date
                             attendance_instance.save()
                             attendance_instance.full_date = date
                             attendance_instance.save()
                             print(attendance_instance)
                     print('Paso 4')
                             

                 return Response({'Created': 'Creado'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        
    

class StudentAttendanceListForProfessor(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentAttendanceSerializer

    """
        Salida  esperada:
            "results": [
                {
                    "schedule_id": 1,
                    "student_rut": "20637999-9",
                    "full_name": "Jorge Gajardo",
                    "number_attendances": 1,
                    "number_absences": 0
                }
            ]

    
    """

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            # Catching URL parameters
            section_id = self.kwargs["section_id"]
            schedule_id = self.kwargs["schedule_id"]
            # Getting instances
            section_instance = get_object_or_404(Section, pk=section_id)
            schedule_instance = get_object_or_404(Schedule, pk = schedule_id)

            # Making Querys
            activeSt = Student.objects.filter(user__is_active=True)
            students_rut = StudentSection.objects.filter(is_active=True)\
                .filter(section_id = section_instance.pk)\
                    .order_by('student_rut__user__last_name')\
                        .values('student_rut')

            # Making response
            result = []
            for student in students_rut:
                currentSt = activeSt.get(pk = student["student_rut"])
                userObj = get_object_or_404(User, pk=currentSt.user.pk)
                attendances = StModel.objects.filter(is_active=True)\
                    .filter(student_rut = currentSt.pk)\
                        .filter(schedule_id = schedule_instance.pk)\
                            .filter(attendance=1)\
                                .count()# Current Student Attendance
                absences= StModel.objects.filter(is_active=True)\
                    .filter(student_rut = currentSt.pk)\
                        .filter(schedule_id = schedule_instance.pk)\
                            .filter(attendance=0)\
                                .count()# Current Student Attendance
                
                result.append({
                    "schedule_id": schedule_instance.pk,
                    "student_rut": currentSt.pk,
                    "full_name": userObj.get_full_name(),
                    "number_attendances": attendances,
                    "number_absences": absences,
                })
            return result
        else:
            raise PermissionDenied
    

class StudentAttendanceUpdate(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentAttendanceModelSerializer
    queryset = StModel.objects.all()
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            return super().patch(request, *args, **kwargs)
        else:
            raise PermissionDenied
    
    def put(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            return super().put(request, *args, **kwargs)
        else:
            raise PermissionDenied
        
class StudentAttendanceDelete(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentAttendanceModelSerializer
    queryset = StModel.objects.all()

    def delete(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            attendance_id = kwargs["pk"]
            attObj= get_object_or_404(StModel, pk = attendance_id)
            attObj.is_active = False
            attObj.save()
            return HttpResponse("Nota desactivada exitosamente",content_type="text/plain")
        else:
            raise PermissionDenied
        

class CourseDetailsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentAttendanceSerializer

    def get(self, request, id_course):
        if(request.user.rol in AUTHORIZED):
            try:
                course = Course.objects.get(id_course=id_course)
                sections = Section.objects.filter(course=course)
                
                course_details = {
                    "course_id": course.id_course,
                    "course_name": course.nivel,
                    "course_attendance_percentage_avg": 0,
                    "sections": [],
                }

                total_students_in_course = 0
                total_attendance_percentage_course = 0

                for section in sections:
                    section_data = {
                        "section_id": section.section_id,
                        "section_name": section.name,
                        "attendance_percentage_avg": 0,
                        "students": [],
                    }

                    students = Student.objects.filter(studentsection__section_id=section.section_id)
                    total_students = len(students)
                    total_students_in_course += total_students
                    total_attendance_percentage_section = 0

                    for student in students:
                        student_data = {
                            "student_rut": student.rut,
                            "student_name": student.user.get_full_name(),
                            "attendance_count": 0,
                            "absence_count": 0,
                            "attendance_percentage": 0,
                            "attendance_by_date": [],
                        }
                        schedule = section.schedule_set.first()  
                        if schedule:
                            attendances = StModel.objects.filter(student_rut=student.rut, is_active=True, schedule_id=schedule.schedule_id)
                            attendance_count = attendances.filter(attendance=1).count()
                            absence_count = attendances.filter(attendance=0).count()

                            attendance_by_date = attendances.values('full_date').annotate(
                                attendance_count=Sum(Case(When(attendance=1, then=1), default=0, output_field=IntegerField())),
                                absence_count=Sum(Case(When(attendance=0, then=1), default=0, output_field=IntegerField()))
                            )

                            student_data["attendance_count"] = attendance_count
                            student_data["absence_count"] = absence_count
                            attendance_percentage = (attendance_count * 100) / (attendance_count + absence_count) if (attendance_count + absence_count) > 0 else 0
                            student_data["attendance_percentage"] = int(attendance_percentage)
                            student_data["attendance_by_date"] = list(attendance_by_date)

                            total_attendance_percentage_section += int(attendance_percentage)

                        section_data["students"].append(student_data)

                    if total_students > 0:
                        section_data["attendance_percentage_avg"] = int(total_attendance_percentage_section / total_students)

                    total_attendance_percentage_course += int(total_attendance_percentage_section)

                    course_details["sections"].append(section_data)

                if total_students_in_course > 0:
                    course_details["course_attendance_percentage_avg"] = int(total_attendance_percentage_course / total_students_in_course)

                return JsonResponse(course_details)

            except Course.DoesNotExist:
                return JsonResponse({"error": "El curso no existe"}, status=404)
        else:
            raise PermissionDenied


##ESPEREMOS QUE FUNCIONE 
class StudentAttendanceAPIView(APIView):
    def get(self, request, user_id):
        try:
            User = get_user_model()
            user = get_object_or_404(User, id=user_id)

            if(request.user.rol in AUTHORIZED):
                try:
                    student = Student.objects.get(user=user)
                    student_sections = StudentSection.objects.filter(student_rut=student)

                    attendance_data = []

                    for student_section in student_sections:
                        section = student_section.section_id
                        subject = section.subject

                        attendance_records = StudentAttendance.objects.filter(
                            student_rut=student,
                            schedule_id__section=section,
                            is_active=True,
                        )

                        attendance_count = attendance_records.filter(attendance=StudentAttendance.Attendance.PRESENT).count()
                        absence_count = attendance_records.filter(attendance=StudentAttendance.Attendance.ABSENT).count()

                        total_attendance_records = attendance_count + absence_count
                        attendance_percentage = (attendance_count / total_attendance_records) * 100 if total_attendance_records > 0 else 0

                        attendance_data.append({
                            "section_id": section.section_id,  # Agrega el campo section_id aquí
                            "subject_name": subject.name,
                            "subject_id": subject.id_subject,
                            "attendance_count": attendance_count,
                            "absence_count": absence_count,
                            "attendance_percentage": attendance_percentage,
                            "absence_dates": list(attendance_records.filter(attendance=StudentAttendance.Attendance.ABSENT).values_list('full_date', flat=True)),
                        })

                    response_data = {
                        "student": {
                            "student_rut": student.rut,
                        },
                        "attendance_data": attendance_data,
                    }

                    return JsonResponse(response_data)

                except Student.DoesNotExist:
                    return JsonResponse({"error": "No se encontró el estudiante especificado"}, status=404)
            else:
                raise PermissionDenied
            
        except User.DoesNotExist:
            return JsonResponse({"error": "No se encontró el usuario especificado"}, status=404)
# API's personalizadas
class StudentAttendanceFilteredByDate(APIView):
    """
        This API catch a date from the client and response a filtered
        student attendance 
    """

    def post(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            date = request.data["date"]
            schedule_id = request.data["schedule_id"]
            
            # Getting instances
            schedule_instance = get_object_or_404(Schedule, pk = schedule_id)
            
            # Making Querys
            activeSt = Student.objects.filter(user__is_active=True) # Active Students
            # Students of section ordered by last name asc
            students_rut = StudentSection.objects.filter(is_active=True)\
                .filter(section_id = schedule_instance.section.pk)\
                    .order_by('student_rut__user__last_name')\
                        .values('student_rut')
            # Filtering student attendance by date
            filter_queryset = StModel.objects.filter(is_active= True)\
                .filter(schedule_id = schedule_id)\
                        .filter(full_date = date)

            # Making response
            result = []
            for student in students_rut:
                currentSt = activeSt.get(pk = student["student_rut"])
                userObj = get_object_or_404(User, pk=currentSt.user.pk)
                try:
                    attendanceSt = get_object_or_404(filter_queryset, student_rut = currentSt.pk)
                    attendance = attendanceSt.attendance
                except Http404:
                    attendance = 0
                
                result.append({
                    "schedule_id": schedule_instance.pk,
                    "student_rut": currentSt.pk,
                    "full_name": userObj.get_full_name(),
                    "attendance": attendance
                })

            
            serializer = StudentAttendanceOfDateSerializer(result, many=True)
            return Response({"response": serializer.data})

        else:
            raise PermissionDenied
        
class StudentAttendanceBySectionAPIView(APIView):
    def get(self, request, section_id):
        try:
            user_model = get_user_model()
            user = get_object_or_404(user_model, id=self.request.user.id)

            if user.rol == 'estudiante':
                try:
                    student = get_object_or_404(Student, user=user)
                    attendance_data = []
                    absence_dates = []

                    section_instance = get_object_or_404(StudentSection, section_id=section_id, student_rut=student.rut)
                    subject_instance = get_object_or_404(subject, pk=section_instance.section_id.subject.pk)

                    attendance_section = StudentAttendance.objects.filter(schedule_id__section=section_instance.section_id)

                    absence_dates.extend(attendance_section.filter(attendance=StudentAttendance.Attendance.ABSENT).values_list('full_date', flat=True))
                    attendance_count = attendance_section.filter(attendance=StudentAttendance.Attendance.PRESENT).count()
                    absence_count = len(absence_dates)
                    total_attendance_records = attendance_count + absence_count
                    attendance_percentage = (attendance_count / total_attendance_records) * 100 if total_attendance_records > 0 else 0

                    attendance_data.append({
                        "subject_name": subject_instance.name,
                        "subject_id": subject_instance.id_subject,
                        "attendance_count": attendance_count,
                        "absence_count": absence_count,
                        "attendance_percentage": attendance_percentage,
                        "absence_dates": absence_dates,
                    })

                    print(attendance_data)
                    return JsonResponse({"data": attendance_data})

                except Student.DoesNotExist:
                    return JsonResponse({"error": "No se encontró el estudiante especificado"}, status=404)

            else:
                return JsonResponse({"error": "El usuario no tiene el rol de estudiante"}, status=400)

        except user_model.DoesNotExist:
            return JsonResponse({"error": "No se encontró el usuario especificado"}, status=403)




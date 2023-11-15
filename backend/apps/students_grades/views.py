# Django imports
from django import forms
from django.shortcuts import (
    render,
    redirect,
    get_object_or_404
)
from django.core.exceptions import PermissionDenied
# DRF imports
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.parsers import MultiPartParser, FormParser
import pandas as pd
import xlwt
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal
from rest_framework import generics
# Serializers
from .serializers import GradesSerializer, GradeForProfessorSerializer, DetailGradesSerializer
# Models
from backend.apps.students_grades.models import student_grades
from backend.apps.student.models import Student
from backend.apps.weighted_average.models import weighted_average
from backend.apps.student_section.models import StudentSection
from backend.apps.user.models import UserAccount
from backend.apps.section.models import Section

from backend.apps.course.models import Course
from backend.apps.section.models import Section
from backend.apps.course.serializers import CourseSerializer
from backend.apps.section.serializers import SectionModelSerializer
from backend.apps.student.models import Student
from backend.apps.weighted_average.models import weighted_average
from backend.apps.student_section.models import StudentSection

from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.db.models import F


AUTHORIZED = ["profesor", "director"]

class StudentGradesCreateAPIView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GradesSerializer

    def post(self, request, section_id, *args, **kwargs):
        if(self.request.user.rol in AUTHORIZED):
            section_instance = Section.objects.get(pk = section_id)
            weighted_instance = weighted_average.objects.get(pk = int(request.data['id_weighted_average']) )
            coefficient = request.data['coefficient']
            list = request.data['form']

            for i in list:
                     for clave, valor in i.items():
                         student_rut_ = clave
                         grade = valor
                         student_instance = Student.objects.get(rut = student_rut_)
                         grade_instance = student_grades(
                             id_weighted_average = weighted_instance,
                             student_rut = student_instance,
                             section_id = section_instance,
                             student_grade = grade,
                             coefficient = coefficient
                         )
                         grade_instance.save()

            return Response('Created', status=status.HTTP_200_OK)
        else:
            raise PermissionDenied

class StudentGradesListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GradesSerializer

    def get_queryset(self):
        # Security question
        if self.request.user.rol == "estudiante":
            # 1st step: adquiring student info
            user_in_session = self.request.user.id
            student = get_object_or_404(Student, user=user_in_session)
            # 2nd step: Getting section identifier
            section_id = self.kwargs["section_id"]
            # 3rd step: Making the queryset
            queryset = student_grades.objects.filter(
                student_rut=student.rut,
                is_active=True,
                student_rut__user__is_active=True,
                section_id=section_id
            ).annotate(
                weighted_average=F('id_weighted_average__weighted_average')
            )
            return queryset
        else:
            raise PermissionDenied

class StudentGradesForProfessor(ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = GradeForProfessorSerializer

    def get_queryset(self):

        """
                Salida esperada:
                [
                    {
                        "student_rut" : "11222333-4",
                        "full_name": "Jorge Gajardo",
                        "grade": [
                                {
                                    "grade_id": "2",
                                    "grade_value": "4.00",
                                    "coefficient": "1",
                                    "id_weighted_average": "1",
                                    "weighted_average": "20"
                                },
                                {
                                    "grade_id": "3",
                                    "grade_value": "6.80",
                                    "coefficient": "1",
                                    "id_weighted_average": "1",
                                    "weighted_average": "20"
                                }
                        ]
                    },
                ]

        """

        if(self.request.user.rol == "profesor"):
            section_id = self.kwargs['section_id']
            all_section = StudentSection.objects.filter(section_id = section_id)\
                .filter(student_rut__user__is_active = True)\
                    .order_by('student_rut__user__last_name')
            queryset = student_grades.objects.filter(is_active=True)\
                .select_related('student_rut')\
                    .filter(section_id = section_id)\
                        .order_by('student_rut__user__last_name')
            students = all_section.values('student_rut').distinct()
            result = [] # resultado

            for st in students:
                student_grade_list = [] # para guardar las notas de un mismo estudiante
                gradesSt = queryset.filter(student_rut = st["student_rut"])
                currentSt = Student.objects.get(rut=st["student_rut"])
                user = UserAccount.objects.get(pk= currentSt.user.pk)
                if(gradesSt.exists() and gradesSt.count() > 0):
                    gradesStDict = gradesSt.values()
                    for g in gradesStDict:
                        waverage = weighted_average.objects.get(pk= g["id_weighted_average_id"])
                        student_grade_list.append({
                            "grade_id": g["id_student_grades"],
                            "grade_value": g["student_grade"],
                            "coefficient": g["coefficient"],
                            "id_weighted_average": g["id_weighted_average_id"],
                            "weighted_average": waverage.weighted_average
                        })
                    result.append({
                        "student_rut": currentSt.rut,
                        "full_name": user.get_full_name(),
                        "grade": student_grade_list
                    })
                else:
                    result.append({
                        "student_rut": currentSt.rut,
                        "full_name": user.get_full_name(),
                        "grade": student_grade_list
                    })

                
            return result

        else:
            raise PermissionDenied
    
class StudentGradeOfStudent(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GradesSerializer

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            student_rut = self.kwargs["rut"]
            queryset = student_grades.objects.filter(student_rut = student_rut)
            return queryset
        else:
            raise PermissionDenied
    

class StudentGradesDetailAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DetailGradesSerializer 

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            id_student_grade = int(self.kwargs["pk"])
            grade = get_object_or_404(student_grades, pk = id_student_grade)
            student = get_object_or_404(Student, pk = grade.student_rut.pk)
            user = get_object_or_404(UserAccount, pk = student.user.pk)

            results = [{
                "student_rut": student.rut,
                "full_name" : user.get_full_name(),
                "grade": {
                    "id_student_grade": grade.pk,
                    "id_weighted_average": grade.id_weighted_average.pk,
                    "weighted_average": grade.id_weighted_average.weighted_average,
                    "student_rut": grade.student_rut,
                    "section_id": grade.section_id,
                    "student_grade": grade.student_grade,
                    "coefficient": grade.coefficient,
                    "is_active": grade.is_active
                }
            }]
            return results
        else:
            raise PermissionDenied

class StudentGradesUpdateAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GradesSerializer
    queryset = student_grades.objects.all()

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

  

class StudentGradesDestroyAPIView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GradesSerializer

    def delete(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            id_student_grades = kwargs["pk"]
            obj = get_object_or_404(student_grades, pk=id_student_grades)
            obj.is_active = False
            obj.save()
            return HttpResponse("Nota desactivada exitosamente",content_type="text/plain")
        else:
            raise PermissionDenied
    

    
class AllCourseIDsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if(request.user.rol in AUTHORIZED):
            courses = Course.objects.values('id_course', 'nivel')
            return Response({'courses': courses})
        else:
            raise PermissionDenied

class CourseGradesInfoView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def list(self, request, pk):
        if request.user.rol in AUTHORIZED:
            try:
                course = get_object_or_404(Course, id_course=pk)
            except Course.DoesNotExist:
                return Response({"message": "Curso no encontrado"}, status=404)

            unique_students = set()  # Conjunto para almacenar identificadores únicos de alumnos
            sections = Section.objects.filter(course=course, is_active=True)
            sections_data = []
            total_course_average = Decimal(0)
            total_course_note_count = 0
            total_alumnos_sobresalientes = 0

            for course_section in sections:
                students = StudentSection.objects.filter(section_id=course_section)
                students_data = []
                total_section_average = Decimal(0)
                total_section_note_count = 0
                alumnos_en_peligro = 0
                alumnos_promedio = 0
                alumnos_sobresalientes = 0

                for student in students:
                    # Agregar identificador único de estudiante al conjunto
                    unique_students.add(student.student_rut.rut)

                    grades = student_grades.objects.filter(student_rut=student.student_rut, section_id=course_section, is_active=True)
                    grades_data = []
                    total_weighted_sum = Decimal(0)
                    total_weighted_coefficients = Decimal(0)
                    total_student_note_count = 0

                    for grade in grades:
                        weighted_coefficient = grade.coefficient
                        weighted_grade = round(grade.student_grade * weighted_coefficient, 1)
                        total_weighted_sum += weighted_grade
                        total_weighted_coefficients += weighted_coefficient

                        weighted_avg = weighted_average.objects.get(id_weighted_average=grade.id_weighted_average.id_weighted_average)
                        weighted_percentage = Decimal(weighted_avg.weighted_average) / 100

                        grades_data.append({
                            'student_id': student.student_rut.rut,
                            'grade': weighted_grade,
                            'coefficient': grade.coefficient,
                            'weighted_percentage': weighted_percentage
                        })
                        total_student_note_count += 1

                    section_average = round(total_weighted_sum / total_weighted_coefficients, 1) if total_weighted_coefficients > 0 else Decimal(0)
                    total_section_average += section_average

                    students_data.append({
                        'student_id': student.student_rut.rut,
                        'student_name': student.student_rut.user.get_full_name(),
                        'cantidad_notas': total_student_note_count,
                        'promedio_seccion': section_average,
                        'estado': '',
                        'notas': grades_data,
                    })

                    total_section_note_count += total_student_note_count

                    if section_average < 4 and total_student_note_count > 0:
                        alumnos_en_peligro += 1
                        students_data[-1]['estado'] = 'peligro'
                    elif 4 <= section_average < 6:
                        alumnos_promedio += 1
                        students_data[-1]['estado'] = 'promedio'
                    elif section_average >= 6:
                        alumnos_sobresalientes += 1
                        students_data[-1]['estado'] = 'sobresaliente'
                    else:
                        alumnos_promedio += 1
                        students_data[-1]['estado'] = 'sin calificar'

                section_general_average = round(total_section_average / len(students), 1) if len(students) > 0 else Decimal(0)
                total_course_average += section_general_average

                section_data = {
                    'section_id': course_section.section_id,
                    'section_name': course_section.name,
                    'promedio_general_seccion': section_general_average,
                    'cantidad_notas': total_section_note_count,
                    'alumnos_en_peligro': alumnos_en_peligro,
                    'alumnos_promedio': alumnos_promedio,
                    'alumnos_sobresalientes': alumnos_sobresalientes,
                    'estudiantes': students_data,
                }

                sections_data.append(section_data)
                total_course_note_count += total_section_note_count
                total_alumnos_sobresalientes += alumnos_sobresalientes

            # Calcular la cantidad de alumnos sin repetir
            total_unique_students = len(unique_students)

            course_general_average = round(total_course_average / len(sections), 1) if len(sections) > 0 else Decimal(0)

            response_data = {
                'course_id': course.id_course,
                'course_name': course.nivel,
                'promedio_general_curso': course_general_average,
                'cantidad_secciones': total_course_note_count,
                'alumnos_sobresalientes': total_alumnos_sobresalientes,
                'cantidad_alumnos_curso': total_unique_students,
                'secciones': sections_data,
            }

            return Response(response_data)
        else:
            raise PermissionDenied

class UploadGradeView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GradesSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, section_id, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            # try:

            section_instance = Section.objects.get(pk = section_id)
            file = request.data['File']
            data = pd.read_excel(file)
            df = pd.DataFrame(data)

            for item in df.itertuples():
                nombre_ = str(item[1])
                rut_ = str(item[2])
                grade = str(item[3])
                coeficiente = str(item[4])
                student_instance = Student.objects.get(rut = rut_)
                weighted_instance, created = weighted_average.objects.get_or_create(id_weighted_average=0,
                    defaults={
                        'weighted_average': 'Ninguno',  # Valor predeterminado para el campo email
                        'is_active': True,
                    }
                )

                grade_instance = student_grades(
                    student_rut = student_instance,
                    section_id = section_instance,
                    student_grade = float(grade),
                    id_weighted_average = weighted_instance,
                    coefficient = coeficiente
                    )
                grade_instance.save()

            return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            # except Exception as e:

            #      return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadStudentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GradesSerializer

    def get(self, request, section_id,  *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            try:
                 section_instance = Section.objects.get(pk = section_id)
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Insumos.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Plantilla_Calificaciones')
                 
                 row_num = 0
                 columns = [ 'Nombre',  'RUT', 'Nota', 'Coeficiente' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 student_data = StudentSection.objects.all().filter(section_id = section_instance, student_rut__user__is_active = True )
                 for student in student_data:
                      row_num += 1
                      ws1.write(row_num, 0, student.student_rut.user.get_full_name())
                      ws1.write(row_num, 1, student.student_rut.rut)

                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        

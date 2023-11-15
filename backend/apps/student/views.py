from rest_framework import viewsets, status
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from django.db import transaction

from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from rest_framework.generics import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.exceptions import (
    PermissionDenied,
)
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
#Serializer
from .serializers import StudentSerializer
#Models
from .models import Student
from backend.apps.administrator.models import AdminProfile
from backend.apps.school.models import school
from backend.apps.user.models import UserAccount
from backend.apps.guardian.models import Guardian
from backend.apps.student_section.models import StudentSection
from backend.apps.student_observations.models import student_observations
from backend.apps.assignments.models import Assignment
from backend.apps.forum.models import Forum

from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth import login
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
import pandas as pd
import xlwt
#======================Student==============================
class ListStudentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def get(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                 utps = Student.objects.all().filter(school = admin_instance.school)
                 queryset = []
                 for user in utps:
                      data_to_send = {
                           'User':{
                                'id':user.user.pk,
                               'rut':user.rut,
                                'name': user.user.get_full_name(),
                                'email': user.user.email,
                                'apoderado': user.guardian_rut.guardian_rut+' '+user.guardian_rut.user.get_full_name(),
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
                 

class CreateStudentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def post(self, request,  *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 if  Guardian.objects.filter(guardian_rut = request.data['rutGuardian'] ).exists():
                      admin_instance = AdminProfile.objects.get(user__pk = self.request.user.id)
                      password_ = make_password(request.data['rut'])
                      school_instance = school.objects.get(rbd = admin_instance.school.rbd )
                      
                      user_instance = UserAccount(
                           first_name = request.data['first_name'],
                           last_name = request.data['last_name'],
                           email = request.data['email'],
                           rol = 'estudiante',
                           password = password_
                           )
                      user_instance.save()

                      guardian_instance = Guardian.objects.get(guardian_rut = request.data['rutGuardian'] )
                      
                      Student_instance = Student(
                           user = user_instance,
                           school = school_instance,
                           rut = request.data['rut'],
                           guardian_rut = guardian_instance
                           )
                      Student_instance.save()
                      return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                 else:
                      return Response({'error': 'El Apoderado no existe'}, status=status.HTTP_404_NOT_FOUND)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied
        

        
class EditStudentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

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

                 guardian_instance = Guardian.objects.get(guardian_rut = request.data['rutGuardian'] )

                 profesor_instance = Student.objects.get(user = user_instance)
                 profesor_instance.guardian_rut = guardian_instance
                 profesor_instance.save()

                 return Response({'Edited': 'Edited'}, status=status.HTTP_201_CREATED)
                 
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
                raise PermissionDenied


class GetStudentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def get(self, request, user_id, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 user = Student.objects.get(user__pk= user_id)
                 queryset = []
                 data_to_send = {

                                'id':user.user.pk,
                                'rut':user.rut,
                                'first_name': user.user.first_name,
                                'last_name': user.user.last_name,
                                'email': user.user.email,
                                'rutGuardian': user.guardian_rut.guardian_rut,
                                'status': user.user.is_active
     
                       }
                 
                 queryset.append(data_to_send)
                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        

class UploadStudentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer
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
                      rutApoderado_ = str(item[4])
                      email_ = str(item[5])
                      password_ = make_password(str(item[3]))


                       
                      
                      user_instance = UserAccount(
                           first_name = nombre_,
                           last_name = apellido_,
                           email = email_,
                           rol = 'estudiante',
                           password = password_
                           )
                      user_instance.save()

                      guardian_instance = Guardian.objects.get(guardian_rut = rutApoderado_ )
                      
                      Student_instance = Student(
                           user = user_instance,
                           school = school_instance,
                           rut = rut_,
                           guardian_rut = guardian_instance
                           )
                      Student_instance.save()
                 return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
                      
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        
class DownloadStudentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'administrador'):
            try:
                 
                 response = HttpResponse(content_type='application/ms-excel')
                 response['Content-Disposition'] = 'attachment; filename="Reporte_Insumos.xls"'
                 
                 wb = xlwt.Workbook(encoding='utf-8')
                 ws1 = wb.add_sheet('Estudiantes')
                 
                 row_num = 0
                 columns = [ 'Nombre', 'Apellido', 'RUT', 'RUT Apoderado', 'Email', 'Contraseña' ]
                 
                 font_style = xlwt.XFStyle()
                 font_style.font.bold = True
                 
                 for col_num in range(len(columns)):
                      ws1.write(row_num, col_num, columns[col_num], font_style)
                 font_style = xlwt.XFStyle()
                 date_format = xlwt.XFStyle()
                 date_format.num_format_str = 'dd/MM/yyyy'
                 
                 student_data = Student.objects.all()
                 for student in student_data:
                      row_num += 1
                      ws1.write(row_num, 0, student.user.first_name)
                      ws1.write(row_num, 1, student.user.last_name)
                      ws1.write(row_num, 2, student.rut)
                      ws1.write(row_num, 3, student.guardian_rut.guardian_rut)
                      ws1.write(row_num, 4, student.user.email)
                      ws1.write(row_num, 5, student.user.password)
                      
                 wb.save(response)
                 return response 
    
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        

@csrf_exempt
@require_POST
def reset_password(request):
    user_id = request.POST.get('user_id')
    user = get_user_model().objects.filter(id=user_id).first()

    if user:
        form = PasswordResetForm(user)
        if form.is_valid():
            form.save()
            # Opcional: Iniciar sesión al usuario automáticamente después del restablecimiento de contraseña
            login(request, user)
            return JsonResponse({'message': 'Contraseña restablecida con éxito.'})
        else:
            return JsonResponse({'error': form.errors})
    else:
        return JsonResponse({'error': 'Usuario no encontrado.'})


class GetDashboardView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'estudiante'):
            try:
                 student_instance = Student.objects.get(user__pk= self.request.user.id)
                 queryset = []
                 sections = StudentSection.objects.all().filter(student_rut = student_instance).count()
                 section_instance = StudentSection.objects.all().filter(student_rut = student_instance)
                 annotations = student_observations.objects.all().filter(rut_student = student_instance).count()
                 assignments = 0
                 forums = 0
                 for i in section_instance:
                      assignments += Assignment.objects.all().filter(section_id = i.section_id).count()
                      forums += Forum.objects.all().filter(section_id = i.section_id).count()
                      
                 queryset.append({

                                'id':student_instance.user.pk,
                                'name': student_instance.user.get_full_name(),
                                'guardian': student_instance.guardian_rut.user.get_full_name(),
                                'sections': sections,
                                'annotations': annotations,
                                'forums': forums
     
                       })

                 return Response(queryset, status=status.HTTP_200_OK)
        
            except Exception as e:
                 print(e)
                 return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
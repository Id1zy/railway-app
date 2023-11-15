from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.documentation import include_docs_urls
from backend.apps.user.views import CustomTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/grades/', include('backend.apps.students_grades.urls')),#lo de las calificaciones#
    path('api/w-average/', include('backend.apps.weighted_average.urls')),# Ponderación
    path('api/user/', include('backend.apps.user.urls')),
    path('api/libro_de_clases/', include('backend.apps.libro_de_clases.urls')),
    path('api/school/', include('backend.apps.school.urls')),
    path('api/asignatura/', include('backend.apps.subject.urls')),
    path('api/course/', include('backend.apps.course.urls')),
    path('api/seccion/', include('backend.apps.section.urls')),
    path('api/foro/', include('backend.apps.forum.urls')),
    path('api/folder/', include('backend.apps.shared_files.urls')),
    path('api/notification/', include('backend.apps.notification.urls')),
    path('api/assignment/', include('backend.apps.assignments.urls')),
    path('api/medical_certificate/', include('backend.apps.medical_certificate.urls')),
    

    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='token_create'), 
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('docs/', include_docs_urls(title="User API")),

    path('api/student/', include('backend.apps.student.urls')),
    path('api/guardian/', include('backend.apps.guardian.urls')),
    path('api/professor/', include('backend.apps.professor.urls')),
    path('api/student_section/', include('backend.apps.student_section.urls')),
    path('api/schedule/', include('backend.apps.schedule.urls')),
    path('api/student_attendance/', include('backend.apps.student_attendance.urls')),
    path('api/professor_attendance/', include('backend.apps.professor_attendance.urls')),
    path('api/administrator/', include('backend.apps.administrator.urls')),
    path('api/student_observations/', include('backend.apps.student_observations.urls')),
    path('api/event/', include('backend.apps.event.urls')),

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
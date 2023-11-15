from django.urls import path, include
from . import views
from .views import StudentsWithoutSectionListAPIView, AddStudentsToSectionsView

urlpatterns = [
    path("list-of-section/<int:pk>/", views.StudentSectionList.as_view(), name="StudentSectionList"),
    path('students-without-course/', StudentsWithoutSectionListAPIView.as_view(), name='students-without-course'),
    path('asignar_estudiantes_a_secciones/', AddStudentsToSectionsView.as_view(), name='asignar_estudiantes_a_secciones'),
]

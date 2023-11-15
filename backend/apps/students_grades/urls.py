from django.urls import path
from .views import *

urlpatterns = [
    #path('crear_nota/', views.crear_nota, name='crear_nota'),
    path('list_grades/<int:section_id>/', StudentGradesForProfessor.as_view()),
    path('listado/<int:section_id>/', StudentGradesListAPIView.as_view(), name='StudentGradesListAPIView'),
    path('grades-of-student/<str:rut>/', StudentGradeOfStudent.as_view(), name='StudentGradeOfStudent'),
    path('delete/<int:pk>/', StudentGradesDestroyAPIView.as_view(), name='StudentGradesDestroyAPIView'),
    path('detail/<pk>/', StudentGradesDetailAPIView.as_view(), name='StudentGradesDetailAPIView'),
    path('update/<int:pk>/', StudentGradesUpdateAPIView.as_view(), name='StudentGradesUpdateAPIView'),
    path('create/<int:section_id>/', StudentGradesCreateAPIView.as_view(), name='StudentGradesCreateAPIView'),

    path('average_course/<int:pk>/', CourseGradesInfoView.as_view(), name='course-info'),
    path('courses/', AllCourseIDsView.as_view(), name='all_course_ids'),

    path('upload/<int:section_id>/', UploadGradeView.as_view(), name='UploadGradesbySection'),
    path('download/<int:section_id>/', DownloadStudentView.as_view(), name='UploadGradesbySection'),
]

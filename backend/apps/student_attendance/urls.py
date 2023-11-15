from django.urls import path, include
from . import views
from .views import StudentAttendanceAPIView


urlpatterns = [
    path("create/", views.StudentAttendanceCreate.as_view(), name="StudentAttendanceCreate"),
    path("attendances-of-section/<int:section_id>/<int:schedule_id>/", views.StudentAttendanceListForProfessor.as_view(), name="StudentAttendanceListForProfessor"),
    path("edit-attendance/<int:pk>/", views.StudentAttendanceUpdate.as_view(), name="StudentAttendanceUpdate"),
    path("delete-attendance/<int:pk>/", views.StudentAttendanceDelete.as_view(), name="StudentAttendanceDelete"),
    path("attendance-of-date/", views.StudentAttendanceFilteredByDate.as_view(), name="AttendanceOfDate"),

    path("get/<int:schedule_id>/", views.StudentAttendanceGET.as_view(), name="GetST"),
    path("edit/", views.StudentAttendanceEdit.as_view(), name="EditST"),

    path('course/<int:id_course>/', views.CourseDetailsView.as_view(), name='course-details'),
    path('student_subject_absences/<int:user_id>/', StudentAttendanceAPIView.as_view(), name='student_subject_absences'),
    path('student_subject/<int:section_id>/', views.StudentAttendanceBySectionAPIView.as_view(), name='student_subject_absences'),

]

from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateGuardianView.as_view(), name='Guardian-create'),
    path('list/', ListGuardianView.as_view(), name='Guardian-list'),
    path('get/<int:user_id>/', GetGuardianView.as_view(), name='Guardian-get'),
    path('edit/<int:user_id>/', EditGuardianView.as_view(), name='Guardian-edit'),
    path('guardian/<str:guardian_rut>/students/', get_students_for_guardian, name='get_students_for_guardian_by_id'),
    path('generar_certificado/<str:rut_estudiante>/', generar_certificado, name='generar_certificado'),
    path('obtener-notas/<str:rut>/', get_student_grades_by_rut, name='get_student_grades_by_rut'),
    path('get_student_name_by_rut/<str:rut>/', get_student_name_by_rut, name='get_student_name_by_rut'),
    path('get_absent_days_for_student/<str:student_rut>/', get_absent_days_for_student, name='get_absent_days_for_student'),
    path('download-file/<int:file_id>/', DownloadFile.as_view(), name='download-file'),
    path('generate_certificate/', CertificatePDFView.as_view(), name='generate_certificate'),
    path('upload/', UploadGuardView.as_view(), name='Guardian-upload'),
    path('download/', DownloadGuardianView.as_view(), name='Guardian-download'),
    path('medical_certificate/students/', myStudentsCertificateView.as_view(), name='Guardian-medical-certificate'),
    path('forum/students/', myStudentsForumView.as_view(), name='Guardian-Forum'),
    path('get_subject/<int:guardian_id>/',get_student_subjects_and_grades,name='get_subject'),
    path('get_students_by_utp/students/', get_students_by_utp, name='get_students_by_utp'),
    path('students/<int:id_course>/', get_students, name='get_students_by_course'),


    path('studentt-guardian/<str:guardian_rut>/', StudentsByGuardianView.as_view(), name='Guardian-Attendance'),
    path('<str:student_id>/attendance/', StudentAttendancePercentage.as_view(), name='Guardian-Attendance'),
    
    path('student_grades/<str:student_id>/', StudentGradesInfoView.as_view(), name='Guardian-Attendance'),
    path('student_observations/<str:student_id>/', StudentObsCourseIdView.as_view(), name='Guardian-Attendance'),
    
    path('student-info/<int:guardian_id>/', getStudentsDetails.as_view(), name='student-info'),
    path('professors-of-student/<int:stid>/', getProfessorsOfStudent.as_view(), name='getProfessorsOfStudent'),
    path('details-meeting-request/<int:puid>/<int:stuid>/', GetForMeetingRequest.as_view(), name='GetForMeetingRequest'),
    path('create-meeting-request/', MakeMeetingRequest.as_view(), name='MakeMeetingRequest'),
    path('list-meeting-request/<int:guardianId>/<int:professorId>/', ListMeetingRequest.as_view(), name='ListMeetingRequest'),
    path('cancel-meeting/<int:meetReqId>/', CancelMeetGuardian.as_view(), name='CancelMeetGuardian'),






]

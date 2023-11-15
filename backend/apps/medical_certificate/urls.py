from django.urls import path
from .views import * 

urlpatterns = [
    path('list/<int:student_rut>/', ListMedicalCertificateView.as_view()), 

    path('create/', CreateMedicalCertificateView.as_view()),

    path('edit/<int:file_id>/', EditFileView.as_view()),

    path('delete/<int:file_id>/', DeleteMedicalCertificateView.as_view()),

   path('download/<int:file_id>/', DownloadFileView.as_view()),
   path('get/<int:file_id>/', GetMedicalCertificateView.as_view()),
]
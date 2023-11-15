from django.urls import path
from .views import *


urlpatterns = [
    path('create/', CreateStudentView.as_view(), name='Student-create'),
    path('list/', ListStudentView.as_view(), name='Student-list'),
    path('get/<int:user_id>/', GetStudentView.as_view(), name='Student-get'),
    path('edit/<int:user_id>/', EditStudentView.as_view(), name='Student-edit'),
    path('upload/', UploadStudentView.as_view(), name='Student-upload'),
    path('download/', DownloadStudentView.as_view(), name='Student-download'),
    path('dashboard/', GetDashboardView.as_view(), name='get-dashboard'),
]
from django.urls import path
from .views import *
urlpatterns = [
    path('create/', CreateProfessorView.as_view(), name='professor-create'),
    path('dashboard-info/', ProfessorDashboard.as_view(), name='ProfessorDashboard'),
    path('list/', ListProfessorView.as_view(), name='professor-list'),
    path('get/<int:user_id>/', GetProfessorView.as_view(), name='professor-get'),
    path('edit/<int:user_id>/', EditProfessorView.as_view(), name='professor-edit'),
    path('upload/', UploadProfessorView.as_view(), name='professor-upload'),
    path('download/', DownloadProfessorView.as_view(), name='professor-download'),
    path('new-available-time/', NewAvailableTime.as_view(), name='NewAvailableTime'),
    path('list-available-time/<int:professorId>/<int:section_id>/', ListAvailableTime.as_view(), name='ListAvailableTime'),
    path('details-available-time/<int:availableTimeId>/<int:section_id>/', AvailableTimeDetails.as_view(), name='AvailableTimeDetails'),
    path('update-available-time/<int:pk>/', UpdateAvailableTime.as_view(), name='UpdateAvailableTime'),
    path('del-or-rec-available-time/<int:pk>/', DeactiveAvailableTime.as_view(), name='DestroyAvailableTime'),
    path('cancel-meet/<int:pk>/', CancelMeetingRequest.as_view(), name='CancelMeetingRequest'),
    path('accept-meet/<int:pk>/', AcceptMeetingRequest.as_view(), name='AcceptMeetingRequest'),
    path('api/professors/', ProfessorListAPIView.as_view(), name='api-professor-list'),
    path('notifications/', ProfessorNotifications.as_view(), name='notifications-list'),



]
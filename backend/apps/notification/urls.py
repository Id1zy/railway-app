from django.urls import path, include
from .views import *

urlpatterns = [
    path('seen/<int:notification_id>/', SeenNotificationView.as_view(), name='notification-seen'),
    path('create/', CreateNotificationView.as_view(), name='notification-create'),
    path('create/section/<int:section_id>/', CreateNotificationSectionView.as_view(), name='notification-create-section'),
    path('create/user/<int:user_id>/', CreateNotificationToView.as_view(), name='notification-create-user'),
    path('list/', ListNotificationView.as_view(), name='notification-list'),
    path('listResume/', ListNotificationResumeView.as_view(), name='notification-list'),
    path('update-notifications/', UpdateNotificationsView.as_view(), name='update-notifications'),

]

from django.urls import path
from .views import *

urlpatterns = [
    path('events/', EventListAPIView.as_view(), name='event-list'),
    path('events/create/', EventCreateView.as_view(), name='event-create'),
    path('events/edit-start-time/<int:pk>/', EventStartTimeUpdateView.as_view(), name='event-edit-start-time'),
    path('events/edit/<int:pk>/', EventUpdateView.as_view(), name='event-edit'),
    path('events/desactivate/<int:pk>/', EventDesactivateView.as_view(), name='event-deactivate'),
]

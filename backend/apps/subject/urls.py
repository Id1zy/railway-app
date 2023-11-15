from django.urls import path
from .views import *

urlpatterns = [
    path('subject/', SubjectView.as_view(), name='subject-list-post'),
    path('subject/<int:pk>/', SubjectDetailView.as_view(), name='subject-get-put-detele'),
    path('utp_subjects/', SubjectListForUTPAPIView.as_view(), name='utp-subjects-list'),
    path('subject/edit/<int:pk>/', SubjectUpdateAPIView.as_view(), name='subject-edit'),
    path('subject/create/', SubjectCreateAPIView.as_view(), name='subject-create'),
    path('subject/desactivate/<int:pk>/', SubjectDesactivateAPIView.as_view(), name='subject-desactivate'),
    path('subject/activate/<int:pk>/', SubjectActivateAPIView.as_view(), name='subject-activate'),
]



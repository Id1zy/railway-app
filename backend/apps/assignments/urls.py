from django.urls import path
from .views import *

urlpatterns = [
    path('list/<int:section_id>/', AssignmentListView.as_view()),
    path('create/', AssignmentCreateView.as_view()),
    path('get/<int:assignment_id>/', AssignmentGetView.as_view()),
    path('status/<int:assignment_id>/', AssignmentStatusView.as_view()),
     path('edit/<int:assignment_id>/', AssignmentEditView.as_view()),
]

from django.urls import path
from .views import *
urlpatterns = [
    
    path('student_observations/', StudentObservationListAPIView.as_view(), name='student-observations-list'),
    path('observations-of-section/<int:section_id>/', StObsFilteredBySection.as_view(), name='StObsFilteredBySection'),
    path('actualizar-observacion/<int:pk>/', StudentObservationUpdateView.as_view(), name='StudentObservationUpdateView'),
    path("desactivar-observacion/<int:pk>/", ObservationDeactivateAPIView.as_view(), name="ObservationDeactivateAPIView"),
    path("crear-observacion/", StudentObservationCreateView.as_view(), name="StudentCreateAPIView"),
    path("all-observacio/", StudentObservationAllView.as_view(), name="StudentAllObservacion"),
    path("course-obs/<int:pk>/", StudentObsCourseIdView.as_view(), name="StudentCourseObservacion"),
]


from django.urls import path
from . import views
from .views import UTPCourseSectionDetailView,SectionDetailView
from .views import SectionDetailView, AcademicPeriodListView,AcademicPeriodCreateView,AcademicPeriodUpdateView,AcademicPeriodDeleteAPIView

urlpatterns = [
    path("nueva-seccion/", views.SectionCreateAPIView.as_view(), name="SectionCreateAPIView"),
    path("actualizar-seccion/<int:pk>/", views.SectionUpdateAPIView.as_view(), name="SectionUpdateAPIView"),
    path("secciones-for-student/", views.SectionListForStudent.as_view(), name="SectionListForStudent"),
    path("secciones-for-student-all/", views.SectionListAllForStudent.as_view(), name="SectionListAllForStudent"),
    path("secciones-for-professor/<int:professorId>/", views.SectionListForProfessor.as_view(), name="SectionListForProfessor"),
    path("secciones-for-professor/", views.SectionListForProfessor2.as_view(), name="SectionListForProfessor2"),
    path("detalle/<int:pk>/", views.SectionDetailAPIView.as_view(), name="SectionDetailAPIView"),
    path("specific-schedule/<int:section_id>/<int:schedule_id>/", views.SectionSpecificSchedule.as_view(), name="SectionSpecificSchedule"),
    path("eliminar-seccion/<int:pk>/", views.SectionDestroyAPIView.as_view(), name="SectionDestroyAPIView"),
    path("seccioness/", views.SectionListProfAPI.as_view(), name='section-detail-with-professor'),

    path("seccionesUTP/", views.SectionListForUTPAPI.as_view(), name='section-detail-course'),
    path("secciones-alumUTP/<int:pk>/", views.SectionAlumnListUTPAPIView.as_view(), name='section-detail-course'),
    path("secciones-infUTP/<int:pk>/", views.SectionInfoUTPAPIView.as_view(), name='section-detail-course'),
    
    path('activate/<int:section_id>/', views.ActivateSectionView.as_view(), name='section-active'),
    path('deactivate/<int:section_id>/', views.DeactivateSectionView.as_view(), name='section-deactive'),


    path('academic-periods/', AcademicPeriodListView.as_view(), name='academic-periods'),
    path('utp/courses/', UTPCourseSectionDetailView.as_view(), name='utp-course-section-detail'),
    path('sections/<int:pk>/', SectionDetailView.as_view(), name='section-detail'),

    #crud periodo
    
    path('academic-periods/create/', AcademicPeriodCreateView.as_view(), name='academic-period-create'),
    path('academic-periods/update/<int:pk>/', AcademicPeriodUpdateView.as_view(), name='academic-period-update'),
    path('academic-periods/delete/<int:pk>/', AcademicPeriodDeleteAPIView.as_view(), name='academic-period-deactivate'),

    
]



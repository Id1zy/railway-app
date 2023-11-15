from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.schoolListView.as_view(), name='school-list'),
    path('get/<str:school_id>/', views.GetSchoolView.as_view(), name='school-detail'),
    path('create/', views.CreateSchoolView.as_view(), name='school-create'),
    path('edit/<str:school_id>/', views.EditSchoolView.as_view(), name='school-edit'),
    path('activate/<str:school_id>/', views.SchoolActivateView.as_view(), name='school-activate'),
    path('deactivate/<str:school_id>/', views.SchoolDeactivateView.as_view(), name='school-deactivate'),
    path('color/', views.GetColor.as_view(), name='school-color'),
]

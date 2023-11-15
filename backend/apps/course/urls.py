from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateCourseView.as_view(), name='Course-create'),
    path('list/', ListCourseView.as_view(), name='Course-list'),
    path('get/<int:course_id>/', GetCourseView.as_view(), name='Course-get'),
    path('edit/<int:course_id>/', EditCourseView.as_view(), name='Course-edit'),
    path('activate/<int:course_id>/', ActivateCourseView.as_view(), name='Course-active'),
    path('deactivate/<int:course_id>/', DeactivateCourseView.as_view(), name='Course-deactive'),

    path('utp-info/<int:id>/', UTPSchoolView.as_view(), name='Utp-info'),
    path("curso-list-utp/", CourseListUtpView.as_view(), name="Course-list-utp"),
    path("curso-list-director/<int:id>/", DirectorCourseInfoView.as_view(), name="Course-list-director"),
    path("dashboard/", CountsDashAPI.as_view(), name="Course-list-director"),
    path('course/update/<int:pk>/', CourseUpdateAPIView.as_view(), name='course-update'),
]

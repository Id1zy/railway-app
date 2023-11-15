from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'schedules', ScheduleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('desactivate-schedule/<int:schedule_id>/', DesactivateScheduleView.as_view(), name='desactivate_schedule'),
    path('section/list/', SectionListView.as_view(), name='section-list'),
    path('section/<int:section_id>/create/', CreateScheduleView.as_view(), name='schedule-post'),
    path('section/<int:section_id>/list/', GetBlockScheduleView.as_view(), name='schedule-get')
]
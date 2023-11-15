from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'admin_profiles', AdminProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create/', CreateAdminView.as_view(), name='admin-create'),
    path('list/', ListAdminView.as_view(), name='admin-list'),
    path('get/<int:user_id>/', GetAdminView.as_view(), name='admin-get'),
    path('edit/<int:user_id>/', EditAdminView.as_view(), name='admin-edit'),
    path('activate/<int:user_id>/', ActivateAdminView.as_view(), name='admin-activate'),
    path('deactivate/<int:user_id>/', DeactivateAdminView.as_view(), name='admin-deactivate'),
    path('dashboard/', DashboardAdminView.as_view(), name='admin-dashboard'),
]

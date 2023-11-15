from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profesores', views.ProfesorViewSet)
router.register(r'apoderados', views.ApoderadoViewSet)
router.register(r'estudiantes', views.EstudianteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

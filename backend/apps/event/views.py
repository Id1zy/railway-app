from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from django.core.exceptions import PermissionDenied
from .models import Event
from .serializers import EventSerializer, EventCreateSerializer, EventStartTimeSerializer, EventUpdateSerializer, EventDesactivateSerializer
from backend.apps.student_section.models import StudentSection
from backend.apps.student.models import Student
from backend.apps.professor.models import Professor
from backend.apps.guardian.models import Guardian
from backend.apps.section.models import Section
from rest_framework.pagination import LimitOffsetPagination
from backend.apps.user.models import *
from backend.apps.notification.models import *

AUTHORIZED_ROLES = ["profesor", "estudiante", "apoderado"]

class LargeResultsSetPagination(LimitOffsetPagination):
    default_limit = 1000

class EventListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer
    pagination_class = LargeResultsSetPagination
    
    def get_queryset(self):
        user = self.request.user
        user_role = user.rol

        if user_role not in AUTHORIZED_ROLES:
            raise PermissionDenied

        if user_role == "profesor":
            professor = Professor.objects.get(user=user)
            return Event.objects.filter(section_id__professor_rut=professor.professor_rut, is_active=True)

        elif user_role == "estudiante":
            student = Student.objects.get(user=user)
            sections = StudentSection.objects.filter(student_rut=student.rut).values_list('section_id', flat=True)
            return Event.objects.filter(section_id__in=sections, is_active=True)

        elif user_role == "apoderado":
            guardian = Guardian.objects.get(user=user)
            student_ruts = Student.objects.filter(guardian_rut=guardian.guardian_rut).values_list('rut', flat=True)
            sections = StudentSection.objects.filter(student_rut__in=student_ruts).values_list('section_id', flat=True)
            return Event.objects.filter(section_id__in=sections, is_active=True)
        
        else:
            return Event.objects.none()

class EventCreateView(CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super(EventCreateView, self).get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        if self.request.user.rol != "profesor":
            raise PermissionDenied("Solo un profesor puede crear un evento.")
        
        professor = Professor.objects.get(user=self.request.user)
        section_id = self.request.data.get("section_id")
        section_instance = Section.objects.get(section_id=section_id)

        if not Section.objects.filter(section_id=section_id, professor_rut=professor.professor_rut).exists():
            raise PermissionDenied("La sección no es válida o no está asignada al profesor.")

        serializer.save(section_id=section_instance)
        event = serializer.save(section_id=section_instance)
        self.create_event_notification(event)

    def create_event_notification(self, event):
        students_sections = StudentSection.objects.filter(section_id=event.section_id)
        
        guardians = set()
        for student_section in students_sections:
            student = student_section.student_rut
            guardians.add(student.guardian_rut)

        for guardian in guardians:
            Notification.objects.create(
                user=guardian.user,
                type=Notification.type_.EVENT,
                issue="Nuevo Evento: " + event.title,
                message=f"Un nuevo evento '{event.title}' ha sido programado para {event.start_date_time.strftime('%Y-%m-%d %H:%M')}.",
            )

        for student_section in students_sections:
            Notification.objects.create(
                user=student_section.student_rut.user,
                type=Notification.type_.EVENT,
                issue="Nuevo Evento: " + event.title,
                message=f"Un nuevo evento '{event.title}' ha sido programado para {event.start_date_time.strftime('%Y-%m-%d %H:%M')}.",
            )


class EventStartTimeUpdateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventStartTimeSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super(EventStartTimeUpdateView, self).get_serializer_context()
        context['request'] = self.request
        return context

    def perform_update(self, serializer):
        if self.request.user.rol != "profesor":
            raise PermissionDenied("Solo un profesor puede editar el start_date_time de un evento.")
        serializer.save()

class EventUpdateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super(EventUpdateView, self).get_serializer_context()
        context['request'] = self.request
        return context

    def perform_update(self, serializer):
        if self.request.user.rol != "profesor":
            raise PermissionDenied("Solo un profesor puede editar un evento.")
        
        serializer.save()

class EventDesactivateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventDesactivateSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user.rol != "profesor":
            raise PermissionDenied("Solo un profesor puede desactivar un evento.")
        serializer.save(is_active=False)

    def update(self, request, *args, **kwargs):

        return super().update(request, *args, **kwargs)
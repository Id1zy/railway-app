from django.shortcuts import render
from rest_framework import viewsets
from .models import ProfessorAttendance
from .serializers import ProfessorAttendanceSerializer


class ProfessorAttendanceViewSet(viewsets.ModelViewSet):
    queryset = ProfessorAttendance.objects.all().order_by('full_date')
    serializer_class = ProfessorAttendanceSerializer


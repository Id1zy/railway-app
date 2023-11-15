from django.db import models
from backend.apps.user.models import *
from backend.apps.school.models import school
from datetime import datetime

class Guardian(models.Model):
    guardian_rut = models.CharField(max_length=10, primary_key=True, db_column="guardian_rut")  
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_column="user")  
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school", default='1')

    class Meta:
        verbose_name = "Apoderado"  
        verbose_name_plural = "Apoderados"
        db_table = "guardian"

    def __str__(self):
        return f"{self.guardian_rut} ({self.user.get_full_name()})"

class Available_times(models.Model):
    id_available_time = models.BigAutoField(primary_key=True, db_column="id_available_time")
    professor_rut = models.ForeignKey('professor.Professor', on_delete=models.CASCADE, db_column="professor_rut")
    
    class Workweek(models.IntegerChoices):
        LUNES = 1
        MARTES = 2
        MIERCOLES = 3
        JUEVES = 4
        VIERNES = 5
        SABADO = 6
        DOMINGO = 7

    day_of_week = models.IntegerField(choices=Workweek.choices)
    start_time_block = models.TimeField()
    end_time_block = models.TimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Horario disponible"
        verbose_name_plural = "Horarios disponibles"
        db_table = "Available_times"

class Meeting_request(models.Model):
    id_meeting_request = models.BigAutoField(primary_key=True, db_column="id_meeting_request")
    id_available_time = models.ForeignKey(to="guardian.Available_times", on_delete=models.CASCADE, db_column="id_available_time")
    guardian_rut = models.ForeignKey(to="guardian.Guardian", on_delete=models.CASCADE, db_column="guardian_rut")
    
    STATUS_CHOICES = [
        ("0", "Rechazada"),
        ("1", "Confirmada"),
        ("2", "En espera"),
        ("3", "Cancelada"),
    ]

    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="2")
    is_active = models.BooleanField(default=True)
    dateSelected = models.DateField()
    timeSelected = models.TimeField()
    

    class Meta:
        verbose_name = "Solicitud de reunión"
        verbose_name_plural = "Solicitudes de reunión"
        db_table = "Meeting_request"
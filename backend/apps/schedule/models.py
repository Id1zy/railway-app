from django.db import models
from backend.apps.section.models import Section, Academic_Period


class Schedule(models.Model):
    schedule_id = models.AutoField(primary_key=True, db_column="schedule_id")
    section = models.ForeignKey(Section, on_delete=models.CASCADE, db_column="section")
    start_time_block = models.TimeField()
    end_time_block = models.TimeField()

    class Workweek(models.IntegerChoices):
        LUNES = 1
        MARTES = 2
        MIERCOLES = 3
        JUEVES = 4
        VIERNES = 5
        SABADO = 6
        DOMINGO = 7

    day_of_week = models.IntegerField(choices=Workweek.choices)

    is_active = models.BooleanField(default=True)
    class Meta:
        unique_together = ('section', 'start_time_block', 'end_time_block', 'day_of_week')
        verbose_name = "Horario"  
        verbose_name_plural = "Horarios"  
        db_table = "schedule"

    def __str__(self):
        return f'{self.get_day_of_week_display()} - {self.start_time_block} to {self.end_time_block}'

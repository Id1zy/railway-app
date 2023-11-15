from django.db import models
from backend.apps.student.models import Student
from backend.apps.schedule.models import Schedule
from backend.apps.guardian.models import Guardian

class student_observations(models.Model):
    id_observation = models.AutoField(primary_key=True, db_column="id_observation")
    rut_student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="Estudiante", db_column="rut_student")
    id_schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, verbose_name="Horario", db_column="id_schedule")
    OBSERVATION_TYPES = [
        ('positiva', 'positiva'),
        ('negativa', 'negativa'),
    ]
    type_observation = models.CharField(max_length=50, choices=OBSERVATION_TYPES, verbose_name="Tipo de Observación")
    description = models.TextField(verbose_name="Descripción")
    is_active = models.BooleanField(default=True)
    class Meta:
        verbose_name = "Observación del Estudiante"
        verbose_name_plural = "Observaciones de los Estudiantes"
        db_table = "student_observations"

    def __str__(self):
        return f'Observación {self.id_observation} - {self.rut_student.user.get_full_name()}'


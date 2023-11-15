from django.db import models
from backend.apps.professor.models import Professor  
from backend.apps.schedule.models import Schedule  


class ProfessorAttendance(models.Model):
    attendance_id = models.AutoField(primary_key=True, db_column="attendance_id")
    professor_rut = models.ForeignKey(Professor, on_delete=models.CASCADE, db_column="professor_rut")  
    schedule = models.ForeignKey(Schedule,on_delete=models.CASCADE, db_column="schedule") 

    class Attendance(models.IntegerChoices):
        PRESENT = 1
        ABSENT = 0
    attendance = models.IntegerField(choices=Attendance.choices, default=0)
    
    full_date = models.DateField()
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Asistencia de profesor"
        verbose_name_plural = "Asistencia de profesores"
        db_table = "professor_attendance"

    def __str__(self):
        return f"{self.professor_rut} - {self.full_date}"

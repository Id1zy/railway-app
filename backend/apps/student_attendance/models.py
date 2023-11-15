from django.db import models
from backend.apps.student.models import Student  
from backend.apps.schedule.models import Schedule  


class StudentAttendance(models.Model):
    attendance_id = models.AutoField(primary_key=True, db_column="attendance_id")
    student_rut = models.ForeignKey(Student, on_delete=models.CASCADE, db_column="student_rut")
    schedule_id = models.ForeignKey(Schedule, on_delete=models.CASCADE, db_column="schedule_id")

    class Attendance(models.IntegerChoices):
        PRESENT = 1
        ABSENT = 0
    attendance = models.IntegerField(choices=Attendance.choices, default=0)

    full_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Asistencia de estudiante"
        verbose_name_plural = "Asistencia de estudiantes"
        db_table = "student_attendance"

    def __str__(self):
        return f"{self.full_date} - {self.student_rut} - {self.schedule_id}"


from django.db import models
from backend.apps.student.models import Student
from backend.apps.section.models import Section
from backend.apps.weighted_average.models import weighted_average

class student_grades(models.Model):
    id_student_grades = models.AutoField(primary_key=True, db_column="id_student_grades")
    id_weighted_average = models.ForeignKey(weighted_average, on_delete=models.CASCADE, db_column="id_weighted_average")
    student_rut = models.ForeignKey(Student, on_delete=models.CASCADE, db_column="student_rut")
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE, db_column="section_id")
    student_grade = models.DecimalField(default=0, max_digits=5, decimal_places=2, verbose_name="Calificaciones")
    coefficient = models.IntegerField(default=1,verbose_name="Coeficiente")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Calificación de estudiante"
        verbose_name_plural = "Calificaciones de los estudiantes"
        db_table = "student_grade"


    def __str__(self):
        return f"{self.student_rut} - {self.student_grade}"

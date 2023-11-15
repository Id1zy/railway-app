from django.db import models
from backend.apps.student.models import * 
from backend.apps.section.models import * 


class StudentSection(models.Model):
    id = models.AutoField(primary_key=True, db_column="id")
    student_rut = models.ForeignKey('student.Student', on_delete=models.CASCADE, db_column="student_rut")  
    section_id = models.ForeignKey('section.Section', on_delete=models.CASCADE, db_column= "section_id")
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "seccion estudiante"  
        verbose_name_plural = "seccion estudiantes"  
        db_table = "student_section"

    def __str__(self):
        return f"{self.id} - {self.student_rut}- {self.section_id}"
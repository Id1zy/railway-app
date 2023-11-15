from django.db import models
from backend.apps.school.models import school

class Course(models.Model):
    id_course = models.BigAutoField(primary_key=True, db_column="id_course")
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school")
    nivel = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"
        db_table = "course"


    def __str__(self):
        return f'{self.school} - Nivel {self.nivel}'


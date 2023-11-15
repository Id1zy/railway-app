from django.db import models
from backend.apps.course.models import Course
from backend.apps.subject.models import subject
from backend.apps.professor.models import Professor


class Academic_Period(models.Model):
    id = models.AutoField(primary_key=True, db_column="id")
    period_name = models.CharField(max_length=40) 
    start_time_period = models.DateField()
    end_time_period = models.DateField()

    class Meta:
        verbose_name = "Semestre"
        verbose_name_plural = "Semestres"
        db_table ="Academic_Period"



class Section(models.Model):
    section_id = models.AutoField(primary_key=True, db_column="section_id")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column="course")
    subject = models.ForeignKey(subject, on_delete=models.CASCADE, db_column="subject")
    professor_rut = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='professor_sections', db_column="professor_rut")
    period = models.ForeignKey(Academic_Period, on_delete=models.CASCADE, db_column="period_id")
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Sección"
        verbose_name_plural = "Secciones"
        db_table = "section"

    def __str__(self):
        return self.name

from django.db import models
from backend.apps.school.models import school  

class subject(models.Model):
    id_subject = models.AutoField(primary_key=True, db_column="id_subject")
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school")
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True) 

    class Meta:
        verbose_name = "Asignatura"
        verbose_name_plural = "Asignaturas"
        db_table = "subject"

    def __str__(self):
        return self.name

from django.db import models
from backend.apps.user.models import *
from backend.apps.guardian.models import *
from backend.apps.school.models import school
from backend.apps.guardian.models import Guardian


class Student(models.Model):
    rut = models.CharField(max_length=10, primary_key=True, db_column="rut")
    user= models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_column="user")
    guardian_rut = models.ForeignKey(Guardian,on_delete=models.CASCADE, db_column="guardian_rut")
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school", default='1')

    class Meta:
        verbose_name = "Estudiante"
        verbose_name_plural = "Estudiantes"
        db_table = "student"

    def __str__(self):
        return f"{self.user.get_full_name()}"
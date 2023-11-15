from django.db import models
from backend.apps.user.models import UserAccount
from backend.apps.student_section.models import *
from backend.apps.school.models import school

class Professor(models.Model):
    professor_rut = models.CharField(max_length=10, primary_key=True, db_column="professor_rut")
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school", default='1')

    class Meta:
        verbose_name = "profesor"
        verbose_name_plural = "profesores"
        db_table = "professor"

    def __str__(self):
        return f"{self.professor_rut} ({self.user.get_full_name()})"

from django.db import models
from backend.apps.section.models import Section

# Create your models here.
class Assignment(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Status(models.IntegerChoices):
        ACTIVO = 1
        BORRADOR= 2
        BLOQUEADO = 3
    status = models.IntegerField(choices=Status.choices, default=1)
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Trabajo"
        verbose_name_plural = "Trabajos"
        db_table = "assignment"

    def __str__(self) -> str:
        return self.title
    



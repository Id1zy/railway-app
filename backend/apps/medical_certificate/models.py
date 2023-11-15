from django.db import models
from backend.apps.guardian.models import Guardian
from backend.apps.student.models import Student
# Create your models here.

def file_directory_path(instance, filename):
 return 'certificate/{0}/{1}'.format(instance.guardian_id.guardian_rut, instance.student_id.rut)

class MedicalCertificate(models.Model):
   guardian_id = models.ForeignKey(Guardian, on_delete=models.CASCADE)
   student_id = models.ForeignKey(Student, on_delete=models.CASCADE)

   class Status(models.IntegerChoices):
        ACTIVO = 1
        OCULTO = 2
   status = models.IntegerField(choices=Status.choices, default=1)

   name =  models.CharField(max_length=255)
   description = models.TextField()
   file = models.FileField(upload_to=file_directory_path)
   created_at = models.DateTimeField(auto_now_add=True)

   def __str__(self)->str:
    return self.name
   
   class Meta:
        verbose_name = "Certificado_Medico"
        verbose_name_plural = "Certificados_Medicos"
        db_table = "medical_certificate"
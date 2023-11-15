from django.db import models
from backend.apps.section.models import Section
from backend.apps.professor.models import Professor

class Folder(models.Model):
   section_id = models.ForeignKey(Section, on_delete=models.CASCADE)
   professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
   
   options_Folder = (
   ('Publicado', 'Publicado'),
   ('Oculto', 'Oculto')
   )

   name =  models.CharField(max_length=255)
   description = models.TextField()
   status = models.CharField(max_length=255, choices=options_Folder, default='Publicado')
   created_at = models.DateTimeField(auto_now_add=True)
   
   def __str__(self)->str:
    return self.name

def file_directory_path(instance, filename):
 return 'folder/{0}/{1}'.format(instance.folder_id.name, instance.folder_id.pk)

class File(models.Model):
   folder_id = models.ForeignKey(Folder, on_delete=models.CASCADE)
   
   options_Folder = (
   ('Publicado', 'Publicado'),
   ('Oculto', 'Oculto')
   )

   name =  models.CharField(max_length=255)
   description = models.TextField()
   file = models.FileField(upload_to=file_directory_path)
   status = models.CharField(max_length=255, choices=options_Folder, default='Publicado')
   created_at = models.DateTimeField(auto_now_add=True)

   def __str__(self)->str:
    return self.name
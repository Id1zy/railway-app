from django.db import models
from backend.apps.user.models import UserAccount


class Colegio(models.Model):
    RBD = models.PositiveIntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)
    direccion = models.TextField()
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre

class Curso(models.Model):
    EDUCACION = (
        ('basica', 'Educación Básica'),
        ('media', 'Educación Media'),
    )
    id_curso = models.AutoField(primary_key=True)
    rbd_colegio = models.ForeignKey(Colegio, related_name='cursos', on_delete=models.CASCADE)
    nivel = models.PositiveIntegerField()
    seccion = models.CharField(max_length=1)
    tipo_educacion = models.CharField(max_length=10, choices=EDUCACION)

    def __str__(self):
        return f"{self.nivel} {self.seccion} - {self.tipo_educacion}"

class Profesor(models.Model):
    usuario = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    rut = models.CharField(max_length=10, primary_key=True)
    especialidad = models.CharField(max_length=255)
    direccion = models.TextField()

    def __str__(self):
        return self.usuario.get_full_name()

class Apoderado(models.Model):
    usuario = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    rut = models.CharField(max_length=10, primary_key=True)
    direccion = models.TextField()
    celular = models.CharField(max_length=15)

    def __str__(self):
        return self.usuario.get_full_name()

class Estudiante(models.Model):
    usuario = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    rut = models.CharField(max_length=10, primary_key=True)
    rut_apoderado = models.ForeignKey(Apoderado, on_delete=models.CASCADE)
    id_curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    edad = models.PositiveIntegerField()
    nacionalidad = models.CharField(max_length=50)

    def __str__(self):
        return self.usuario.get_full_name()
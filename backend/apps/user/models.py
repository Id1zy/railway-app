from django.contrib.auth.models import Group
from backend.apps.school.models import school

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import os
from django.core.validators import FileExtensionValidator
from django_resized import ResizedImageField
from backend.apps.school.models import school

class UserAccountManager(BaseUserManager):

    class Meta:
        db_table = "useraccountmanager"


    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Los Usuarios deben tener una dirección de correo')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.rol = 'superuser'
        user.save(using=self._db)
        return user
    
def determine_image_format(instance, filename):
    extension = filename.split('.')[-1].lower()

    format_mapping = {
        'jpg': 'JPEG',
        'jpeg': 'JPEG',
        'png': 'PNG',
        'gif': 'GIF',
    }

    return f'images/{instance.pk}.{format_mapping.get(extension, "JPEG")}'

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    avatar = ResizedImageField(size=[134, 128], upload_to=determine_image_format, null=True, blank=True, crop=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    #Dado que existen distintos tipos de usuarios
    ROLES = (
        ('superuser', 'SuperUser'),
        ('profesor', 'Profesor'),
        ('apoderado', 'Apoderado'),
        ('estudiante', 'Estudiante'),
        ('secretario', 'Secretario'),
        ('director', 'Director'),
        ('inspector', 'Inspector'),
        ('administrador', 'Administrador'),
        ('UTP','UTP'),
    )
    rol = models.CharField(max_length=15, choices=ROLES)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'rol']

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        db_table = "useraccount"

    def get_full_name(self):
        return self.first_name+' '+self.last_name
    
    def get_short_name(self):
        return self.first_name
    
    def __str__(self) -> str:
        return self.email
    

class Director(models.Model):
    id = models.BigAutoField(primary_key=True, db_column="id")
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_column="user")
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school")

    class Meta:
        verbose_name = "Director"
        verbose_name_plural = "Directores"
        unique_together = ('user', 'school') # Sólo 1 director por colegio
        db_table = "Director"

class Inspector(models.Model):
    id = models.BigAutoField(primary_key=True, db_column="id")
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_column="user")
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school")

    class Meta:
        verbose_name = "Inspector"
        verbose_name_plural = "Inspectores"
        db_table = "Inspector"

class Secretary(models.Model):
    id = models.BigAutoField(primary_key=True, db_column="id")
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_column="user")
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school")
    
    class Meta:
        verbose_name = "Secretario"
        verbose_name_plural = "Secretarios"
        db_table = "Secretary"

class UTP(models.Model):
    id = models.BigAutoField(primary_key=True, db_column="id")
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_column="user")
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school")
    
    class Meta:
        verbose_name = "UTP"
        verbose_name_plural = "UTPs"
        db_table = "UTP"
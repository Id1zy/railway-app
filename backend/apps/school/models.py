from django.db import models

class school(models.Model):
    rbd = models.CharField(verbose_name='RBD',max_length=100, primary_key=True, db_column="rbd")
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    color = models.CharField(max_length=255, default='blue')

    class Meta:
        verbose_name = "Colegio"
        verbose_name_plural = "Colegios"
        db_table = "school"


    def __str__(self):
        return self.name

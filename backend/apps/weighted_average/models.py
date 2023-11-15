from django.db import models

class weighted_average(models.Model):
    id_weighted_average = models.AutoField(primary_key=True, db_column="id_weighted_average")
    weighted_average = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Ponderación"
        verbose_name_plural = "Ponderaciones"
        db_table = "weighted_average"

    def __str__(self):
        return str(self.weighted_average)

from django.db import models
from backend.apps.section.models import Section

class Event(models.Model):
    id = models.AutoField(primary_key=True, db_column="id")
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE, db_column="section_id")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_date_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "evento"
        verbose_name_plural = "eventos"
        db_table = "Event"

    def __str__(self):
        return self.title

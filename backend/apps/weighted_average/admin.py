from django.contrib import admin
from .models import weighted_average

@admin.register(weighted_average)
class WeightedAverageAdmin(admin.ModelAdmin):
    list_display = ('id_weighted_average', 'weighted_average')
    search_fields = ('weighted_average',)

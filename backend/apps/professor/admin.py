from django.contrib import admin
from .models import Professor

class ProfessorAdmin(admin.ModelAdmin):
    list_display = ['professor_rut', 'user', 'phone']
    search_fields = ['professor_rut', 'user__email', 'phone']

admin.site.register(Professor, ProfessorAdmin)

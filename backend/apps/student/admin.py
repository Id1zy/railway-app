from django.contrib import admin
from .models import Student

class StudentAdmin(admin.ModelAdmin):
    list_display = ('rut', 'user', 'guardian_rut')
    search_fields = ('rut', 'user__email', 'guardian_rut__guardian_rut')

admin.site.register(Student, StudentAdmin)
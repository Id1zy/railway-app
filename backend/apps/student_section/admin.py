from django.contrib import admin
from .models import StudentSection


class StudentSectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'student_rut', 'section_id')
    search_fields = ('id', 'student_rut__rut', 'section_id__id') 


admin.site.register(StudentSection, StudentSectionAdmin)

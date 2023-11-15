from django.contrib import admin
from .models import student_grades

@admin.register(student_grades)
class StudentGradesAdmin(admin.ModelAdmin):
    list_display = ('id_student_grades', 'id_weighted_average', 'student_rut', 'section_id', 'student_grade')
    search_fields = ('student_rut__rut', 'section_id__name', 'student_grade')  
    list_filter = ('id_weighted_average', 'student_rut', 'section_id') 


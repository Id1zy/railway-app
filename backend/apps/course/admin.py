from django.contrib import admin
from .models import Course

from django.contrib import admin
from .models import Course

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id_course', 'school', 'nivel', 'is_active')
    list_filter = ('school', 'nivel', 'is_active')
    search_fields = ('school__name', 'nivel')  
    ordering = ('school', 'nivel')
    
    

admin.site.register(Course, CourseAdmin)


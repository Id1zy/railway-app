from django.contrib import admin
from .models import subject  

@admin.register(subject)
class subjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    list_filter = ('is_active',)

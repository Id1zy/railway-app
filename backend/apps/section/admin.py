from django.contrib import admin
from .models import Section, Academic_Period


class SectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'course', 'professor_rut', 'period', 'is_active')
    list_filter = ('subject', 'course', 'professor_rut', 'is_active')
    search_fields = ('name', 'subject__name', 'course__name', 'professor_rut__name', 'period')
    list_editable = ('is_active',)

admin.site.register(Section, SectionAdmin)

class Academic_PeriodAdmin(admin.ModelAdmin):
    list_display = ['id', 'period_name', 'start_time_period', 'end_time_period']
    search_fields = ['period_name']
    list_filter = ['start_time_period', 'end_time_period']

admin.site.register(Academic_Period, Academic_PeriodAdmin)


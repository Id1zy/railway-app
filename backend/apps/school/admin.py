from django.contrib import admin
from .models import school

@admin.register(school)
class schoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'email', 'phone')
    search_fields = ('name',)

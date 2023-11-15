from django.contrib import admin
from .models import Guardian

class GuardianAdmin(admin.ModelAdmin):
    list_display = ['guardian_rut','address', 'phone']
    search_fields = ['guardian_rut','address']


admin.site.register(Guardian, GuardianAdmin)

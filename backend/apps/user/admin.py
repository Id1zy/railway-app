from django.contrib import admin

from . import models

from django.contrib.auth import get_user_model
User = get_user_model()

class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'rol', 'is_staff', 'is_superuser', 'is_active', 'last_login')
    list_display_links = ('first_name', 'last_name', 'email', )
    search_fields = ('first_name', 'last_name', 'email', 'rol', 'is_staff', 'is_superuser', 'is_active', 'last_login')
    list_per_page = 25

class UTPAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'school')
    list_display_links = ('id', 'user', 'school')
    search_fields = ('id', 'user__username', 'school__name') 
    list_per_page = 25

admin.site.register(User, UserAdmin)
admin.site.register(models.UTP, UTPAdmin)


'''
admin.site.register(UserProfile)
'''
from django.contrib import admin
from .models import Notification

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('issue', 'user', 'type', 'seen', 'created_at')  
    list_filter = ('type', 'seen', 'created_at')  
    search_fields = ('issue', 'message') 

admin.site.register(Notification, NotificationAdmin)


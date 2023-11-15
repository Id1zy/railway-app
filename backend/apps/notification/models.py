from django.db import models
from backend.apps.user.models import UserAccount

class Notification(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    class type_(models.IntegerChoices):
        INFORMATIVE = 1
        ALERT = 2
        EVENT = 3
        UPDATE = 4
        REMINDER= 5
        SOCIAL = 6
        ERROR = 7

    type = models.IntegerField(choices=type_.choices)
    issue = models.CharField(max_length=255)
    message = models.TextField()
    seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        verbose_name = "notificacion"
        verbose_name_plural = "notificaciones"
        db_table = "notification"


    def __str__(self):
        return self.issue

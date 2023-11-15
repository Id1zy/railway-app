from django.db import models
from backend.apps.user.models import *
from backend.apps.school.models import school

class AdminProfile(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    school = models.ForeignKey(school, on_delete=models.CASCADE, db_column="school")
    

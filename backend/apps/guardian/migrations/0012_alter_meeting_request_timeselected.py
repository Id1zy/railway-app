# Generated by Django 4.2.2 on 2023-11-11 15:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guardian', '0011_alter_meeting_request_dateselected_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting_request',
            name='timeSelected',
            field=models.TimeField(default=datetime.time(12, 12, 50, 974148)),
        ),
    ]

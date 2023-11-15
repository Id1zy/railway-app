# Generated by Django 4.2.2 on 2023-11-09 16:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guardian', '0009_alter_meeting_request_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting_request',
            old_name='date',
            new_name='dateSelected',
        ),
        migrations.AddField(
            model_name='meeting_request',
            name='timeSelected',
            field=models.TimeField(default=datetime.time(13, 29, 28, 776278)),
        ),
        migrations.AlterField(
            model_name='meeting_request',
            name='status',
            field=models.CharField(choices=[('0', 'Rechazada'), ('1', 'Confirmada'), ('2', 'En espera'), ('3', 'Cancelada')], default='2', max_length=1),
        ),
    ]
# Generated by Django 4.2.2 on 2023-10-28 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guardian', '0003_available_times_meeting_request'),
    ]

    operations = [
        migrations.AddField(
            model_name='available_times',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]

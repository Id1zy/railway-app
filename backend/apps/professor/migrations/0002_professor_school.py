# Generated by Django 4.2.2 on 2023-10-21 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('school', '0001_initial'),
        ('professor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='school',
            field=models.ForeignKey(db_column='school', default='1', on_delete=django.db.models.deletion.CASCADE, to='school.school'),
        ),
    ]

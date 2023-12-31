# Generated by Django 4.2.2 on 2023-10-20 15:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('guardian', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('rut', models.CharField(db_column='rut', max_length=10, primary_key=True, serialize=False)),
                ('guardian_rut', models.ForeignKey(db_column='guardian_rut', on_delete=django.db.models.deletion.CASCADE, to='guardian.guardian')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Estudiante',
                'verbose_name_plural': 'Estudiantes',
                'db_table': 'student',
            },
        ),
    ]

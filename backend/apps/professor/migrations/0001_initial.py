# Generated by Django 4.2.2 on 2023-10-20 15:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Professor',
            fields=[
                ('professor_rut', models.CharField(db_column='professor_rut', max_length=10, primary_key=True, serialize=False)),
                ('phone', models.CharField(max_length=20)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'profesor',
                'verbose_name_plural': 'profesores',
                'db_table': 'professor',
            },
        ),
    ]

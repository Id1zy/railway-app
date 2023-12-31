# Generated by Django 4.2.2 on 2023-10-22 21:04

import backend.apps.user.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('school', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('avatar', django_resized.forms.ResizedImageField(blank=True, crop=False, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[134, 128], upload_to=backend.apps.user.models.determine_image_format)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('rol', models.CharField(choices=[('superuser', 'SuperUser'), ('profesor', 'Profesor'), ('apoderado', 'Apoderado'), ('estudiante', 'Estudiante'), ('secretario', 'Secretario'), ('director', 'Director'), ('inspector', 'Inspector'), ('administrador', 'Administrador'), ('UTP', 'UTP')], max_length=15)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuarios',
                'db_table': 'useraccount',
            },
        ),
        migrations.CreateModel(
            name='UTP',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('school', models.ForeignKey(db_column='school', on_delete=django.db.models.deletion.CASCADE, to='school.school')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'UTP',
                'verbose_name_plural': 'UTPs',
                'db_table': 'UTP',
            },
        ),
        migrations.CreateModel(
            name='Secretary',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('school', models.ForeignKey(db_column='school', on_delete=django.db.models.deletion.CASCADE, to='school.school')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Secretario',
                'verbose_name_plural': 'Secretarios',
                'db_table': 'Secretary',
            },
        ),
        migrations.CreateModel(
            name='Inspector',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('school', models.ForeignKey(db_column='school', on_delete=django.db.models.deletion.CASCADE, to='school.school')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Inspector',
                'verbose_name_plural': 'Inspectores',
                'db_table': 'Inspector',
            },
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('id', models.BigAutoField(db_column='id', primary_key=True, serialize=False)),
                ('school', models.ForeignKey(db_column='school', on_delete=django.db.models.deletion.CASCADE, to='school.school')),
                ('user', models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Director',
                'verbose_name_plural': 'Directores',
                'db_table': 'Director',
                'unique_together': {('user', 'school')},
            },
        ),
    ]

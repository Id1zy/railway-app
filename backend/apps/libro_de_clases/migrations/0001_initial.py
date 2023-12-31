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
            name='Apoderado',
            fields=[
                ('rut', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('direccion', models.TextField()),
                ('celular', models.CharField(max_length=15)),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Colegio',
            fields=[
                ('RBD', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('direccion', models.TextField()),
                ('telefono', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id_curso', models.AutoField(primary_key=True, serialize=False)),
                ('nivel', models.PositiveIntegerField()),
                ('seccion', models.CharField(max_length=1)),
                ('tipo_educacion', models.CharField(choices=[('basica', 'Educación Básica'), ('media', 'Educación Media')], max_length=10)),
                ('rbd_colegio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cursos', to='libro_de_clases.colegio')),
            ],
        ),
        migrations.CreateModel(
            name='Profesor',
            fields=[
                ('rut', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('especialidad', models.CharField(max_length=255)),
                ('direccion', models.TextField()),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('rut', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('edad', models.PositiveIntegerField()),
                ('nacionalidad', models.CharField(max_length=50)),
                ('id_curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='libro_de_clases.curso')),
                ('rut_apoderado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='libro_de_clases.apoderado')),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

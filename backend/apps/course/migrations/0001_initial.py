# Generated by Django 4.2.2 on 2023-10-20 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('school', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id_course', models.BigAutoField(db_column='id_course', primary_key=True, serialize=False)),
                ('nivel', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('school', models.ForeignKey(db_column='school', on_delete=django.db.models.deletion.CASCADE, to='school.school')),
            ],
            options={
                'verbose_name': 'Curso',
                'verbose_name_plural': 'Cursos',
                'db_table': 'course',
            },
        ),
    ]
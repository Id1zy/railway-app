# Generated by Django 4.2.2 on 2023-10-20 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('section', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('schedule_id', models.AutoField(db_column='schedule_id', primary_key=True, serialize=False)),
                ('start_time_block', models.TimeField()),
                ('end_time_block', models.TimeField()),
                ('day_of_week', models.IntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday')])),
                ('is_active', models.BooleanField(default=True)),
                ('section', models.ForeignKey(db_column='section', on_delete=django.db.models.deletion.CASCADE, to='section.section')),
            ],
            options={
                'verbose_name': 'Horario',
                'verbose_name_plural': 'Horarios',
                'db_table': 'schedule',
                'unique_together': {('section', 'start_time_block', 'end_time_block', 'day_of_week')},
            },
        ),
    ]

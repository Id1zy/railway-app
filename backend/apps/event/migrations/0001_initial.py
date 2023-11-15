# Generated by Django 4.2.2 on 2023-11-09 00:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('section', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(db_column='id', primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('start_date_time', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('section_id', models.ForeignKey(db_column='section_id', on_delete=django.db.models.deletion.CASCADE, to='section.section')),
            ],
            options={
                'verbose_name': 'evento',
                'verbose_name_plural': 'eventos',
                'db_table': 'Event',
            },
        ),
    ]
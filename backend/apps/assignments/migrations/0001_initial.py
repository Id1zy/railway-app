# Generated by Django 4.2.2 on 2023-10-28 02:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('section', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('deadline', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(choices=[(1, 'Activo'), (2, 'Borrador'), (3, 'Bloqueado')])),
                ('section_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='section.section')),
            ],
        ),
    ]

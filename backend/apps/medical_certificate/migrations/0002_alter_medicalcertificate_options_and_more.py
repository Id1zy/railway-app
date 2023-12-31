# Generated by Django 4.2.2 on 2023-11-01 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medical_certificate', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='medicalcertificate',
            options={'verbose_name': 'Certificado_Medico', 'verbose_name_plural': 'Certificados_Medicos'},
        ),
        migrations.AlterField(
            model_name='medicalcertificate',
            name='status',
            field=models.IntegerField(choices=[(1, 'Activo'), (2, 'Oculto')], default=1),
        ),
        migrations.AlterModelTable(
            name='medicalcertificate',
            table='medical_certificate',
        ),
    ]

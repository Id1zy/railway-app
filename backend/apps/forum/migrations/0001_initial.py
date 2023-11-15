# Generated by Django 4.2.2 on 2023-10-20 15:08

import backend.apps.forum.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('professor', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('section', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Forum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30, unique=True)),
                ('thumbnail', django_resized.forms.ResizedImageField(blank=True, crop=False, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[400, 180], upload_to=backend.apps.forum.models.determine_image_format)),
                ('description', models.TextField()),
                ('category', models.CharField(choices=[('anuncio', 'Anuncio'), ('discusion', 'Discusión'), ('sugerencias', 'Sugerencias'), ('off-topic', 'Off-Topic')], default='Discusión', max_length=255)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('borrador', 'Borrador'), ('publicado', 'Publicado')], default='publicado', max_length=255)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='professor.professor')),
                ('section_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='section.section')),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
        migrations.CreateModel(
            name='ForumComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='PostForum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('excerpt', models.CharField(max_length=100)),
                ('forum_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forum.forum')),
            ],
        ),
        migrations.CreateModel(
            name='ForumSubComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('forum_comment_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subcomments', to='forum.forumcomment')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subcomments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddField(
            model_name='forumcomment',
            name='postforum_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='forum.postforum'),
        ),
    ]

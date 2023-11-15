from django.db import models
from backend.apps.professor.models import Professor
from backend.apps.section.models import Section
from backend.apps.user.models import UserAccount
from django_resized import ResizedImageField


# Create your models here.
def forum_directory_path(instance, filename):
    return 'forum/{0}/{1}'.format(instance.title, filename)

def determine_image_format(instance, filename):
    extension = filename.split('.')[-1].lower()

    format_mapping = {
        'jpg': 'JPEG',
        'jpeg': 'JPEG',
        'png': 'PNG',
        'gif': 'GIF',
    }

    return f'forum/{instance.pk}.{format_mapping.get(extension, "JPEG")}'

class Forum(models.Model):
    author = models.ForeignKey(Professor, on_delete=models.CASCADE)
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE)

    options_Forum = (
        ('anuncio', 'Anuncio'),
        ('discusion', 'Discusión'),
        ('sugerencias', 'Sugerencias'),
        ('off-topic', 'Off-Topic'),
        ('apoderado', 'Apoderado'),
    )
    options = (
        ('borrador', 'Borrador'),
        ('publicado', 'Publicado'),
    )


    title = models.CharField(max_length=30, unique=True)
    thumbnail =  ResizedImageField(size=[400, 180], upload_to=determine_image_format, null=True, blank=True, crop=False)
    description = models.TextField()
    category = models.CharField(max_length=255, choices=options_Forum, default='Discusión')
    published = models.DateTimeField(auto_now_add=True)
    status =  models.CharField(max_length=255, choices=options, default='publicado')

    class Meta:
        ordering = ('-published',)
    

class PostForum(models.Model):
    forum_id = models.ForeignKey(Forum, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    excerpt = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    

class ForumComment(models.Model):
    postforum_id = models.ForeignKey(PostForum, on_delete=models.CASCADE, related_name='comments')
    creator = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='comments')

    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = [
            '-created_at'
        ]

    
class ForumSubComment(models.Model):
    forum_comment_id = models.ForeignKey(ForumComment, on_delete=models.CASCADE, related_name='subcomments')
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='subcomments')

    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = [
            '-created_at'
        ]

   



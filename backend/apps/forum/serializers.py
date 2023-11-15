from rest_framework import serializers
from .models import PostForum, Forum, ForumComment, ForumSubComment

class ForumSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField()
    class Meta:
        model=Forum
        fields=[
            'id',
            'author',
            'section_id',
            'title',
            'thumbnail',
            'description',
            'category',
            'published',
            'status',
        ]

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=PostForum
        fields='__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=ForumComment
        fields = '__all__' 

class SubCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=ForumSubComment
        fields = '__all__' 



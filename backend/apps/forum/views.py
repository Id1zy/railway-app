
from .serializers import ForumSerializer, PostSerializer, CommentSerializer, SubCommentSerializer
from django.conf import settings
from django.db import transaction
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db.models.query_utils import Q
from django.core.exceptions import (
    PermissionDenied,
)
from backend.apps.course.models import Course
from backend.apps.student.models import Student
from backend.apps.guardian.models import Guardian
from backend.apps.professor.models import Professor
from backend.apps.notification.models import Notification
from backend.apps.student_section.models import StudentSection
from backend.apps.section.models import Section
from .models import Forum, PostForum, ForumComment, ForumSubComment
from backend.apps.user.models import UserAccount

class CommentListView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request, pk, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):

            queryset_ = []
            post_instance = PostForum.objects.get(forum_id = pk)
            ParentComment = ForumComment.objects.all().filter(postforum_id= post_instance )

            for comment in ParentComment:
                data_to_send = {
                    'Parent':{
                        'id':comment.pk,
                        'user': comment.creator.get_full_name(),
                        'avatar': comment.creator.avatar.url if comment.creator.avatar and comment.creator.avatar.url else None,
                        'title': comment.title,
                        'content': comment.content,
                        'created_at': comment.created_at
                    },
                    'Sons': [],
                }
                subComment = ForumSubComment.objects.all().filter(forum_comment_id = comment)
                for sub in subComment:
                    subC ={
                        'subSon':{
                            'user': sub.owner.get_full_name(),
                        'avatar': sub.owner.avatar.url if sub.owner.avatar and sub.owner.avatar.url else None,
                        'title': sub.title,
                        'content': sub.content,
                        'created_at': sub.created_at
                        },
                    }
                    data_to_send['Sons'].append(subC)
                queryset_.append(data_to_send)

   

            return Response(queryset_, status=status.HTTP_200_OK)

        elif (self.request.user.rol == 'estudiante'):

            queryset_ = []
            ParentComment = ForumComment.objects.all().filter(postforum_id__forum_id = pk)

            for comment in ParentComment:
                data_to_send = {
                    'Parent':{
                        'id':comment.pk,
                        'user': comment.creator.get_full_name(),
                        'avatar': comment.creator.avatar.url if comment.creator.avatar and comment.creator.avatar.url else None,
                        'title': comment.title,
                        'content': comment.content,
                        'created_at': comment.created_at
                    },
                    'Sons': [],
                }
                subComment = ForumSubComment.objects.all().filter(forum_comment_id = comment)
                for sub in subComment:
                    subC ={
                        'subSon':{
                            'user': sub.owner.get_full_name(),
                        'avatar': sub.owner.avatar.url if sub.owner.avatar and sub.owner.avatar.url else None,
                        'title': sub.title,
                        'content': sub.content,
                        'created_at': sub.created_at
                        },
                    }
                    data_to_send['Sons'].append(subC)
                queryset_.append(data_to_send)

   

            return Response(queryset_, status=status.HTTP_200_OK)
        
        elif (self.request.user.rol == 'apoderado'):

            queryset_ = []
            ParentComment = ForumComment.objects.all().filter(postforum_id__forum_id = pk)

            for comment in ParentComment:
                data_to_send = {
                    'Parent':{
                        'id':comment.pk,
                        'user': comment.creator.get_full_name(),
                        'avatar': comment.creator.avatar.url if comment.creator.avatar and comment.creator.avatar.url else None,
                        'title': comment.title,
                        'content': comment.content,
                        'created_at': comment.created_at
                    },
                    'Sons': [],
                }
                subComment = ForumSubComment.objects.all().filter(forum_comment_id = comment)
                for sub in subComment:
                    subC ={
                        'subSon':{
                            'user': sub.owner.get_full_name(),
                        'avatar': sub.owner.avatar.url if sub.owner.avatar and sub.owner.avatar.url else None,
                        'title': sub.title,
                        'content': sub.content,
                        'created_at': sub.created_at
                        },
                    }
                    data_to_send['Sons'].append(subC)
                queryset_.append(data_to_send)

   

            return Response(queryset_, status=status.HTTP_200_OK)
            
        else:
                raise PermissionDenied


class CreateCommentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    authorized = [ 'profesor', 'estudiante', 'apoderado']

    def post(self, request,pk, *args, **kwargs):
        if (self.request.user.rol in self.authorized):
            try:
                id = request.data.get('pk')
   
                forum_id = PostForum.objects.get(forum_id=pk)
                creator_ = UserAccount.objects.get(pk=self.request.user.id)
                title_ = request.data.get('title')
                content_ = request.data.get('content')

                comment = ForumComment(
                    postforum_id=forum_id,
                    creator=creator_,
                    title=title_,
                    content=content_
                )
                comment.save()

                

                return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
            
            except (ValidationError, KeyError, Forum.DoesNotExist) as e:
                return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
            except ParseError as e:
                return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
                raise PermissionDenied

class CreateSubCommentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubCommentSerializer
    authorized = [ 'profesor', 'estudiante', 'apoderado']

    def post(self, request,pk, *args, **kwargs):
        if (self.request.user.rol in self.authorized):
            try:
                forum_comment_id_ = ForumComment.objects.get(pk=pk)
                owner_ = UserAccount.objects.get(pk=self.request.user.id)
                title_ = request.data.get('title')
                content_ = request.data.get('content')

                comment = ForumSubComment(
                    forum_comment_id=forum_comment_id_,
                    owner=owner_,
                    title=title_,
                    content=content_
                )
                comment.save()

                noti_instance = Notification(
                           user = comment.forum_comment_id.creator,
                           type = 6,
                           issue ='Foro:'+forum_comment_id_.postforum_id.title,
                           message = 'Tienes un Nuevo Comentario.'
                )
                noti_instance.save()

                return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
            
            except (ValidationError, KeyError, Forum.DoesNotExist) as e:
                return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
            except ParseError as e:
                return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
                raise PermissionDenied


class ForumListView(mixins.ListModelMixin, generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ForumSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, pk, *args, **kwargs):

        if (self.request.user.rol == 'profesor'):
            queryset = Forum.objects.all().filter(section_id = pk).order_by('-id')
            serializer = ForumSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif (self.request.user.rol == 'estudiante'):
            queryset = Forum.objects.all().filter(section_id = pk, status='publicado').filter(~Q(category='apoderado')).order_by('-id')
            serializer = ForumSerializer(queryset, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        elif (self.request.user.rol == 'apoderado'):
            queryset = Forum.objects.all().filter(section_id = pk, status='publicado', category='apoderado').order_by('-id')
            serializer = ForumSerializer(queryset, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied


class ForumPostListView(mixins.ListModelMixin, generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = PostSerializer

     def get(self, request, pk, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            queryset = PostForum.objects.filter(forum_id = pk)
            foro = Forum.objects.get(pk=pk)
            serializer = PostSerializer(queryset, many=True)

            ParentComment = ForumComment.objects.all().filter(postforum_id__forum_id= pk)
            quantity = 0

            for comment in ParentComment:
                quantity += 1
                subComment = ForumSubComment.objects.all().filter(forum_comment_id = comment)
                for sub in subComment:
                    quantity += 1
              
            queryset_ = PostForum.objects.get(forum_id = pk)

            respuesta = {
                'data': serializer.data,
                'adition': {
                    'id':queryset_.pk,
                    'date':foro.published,
                    'author':foro.author.user.get_full_name(),
                    'category': foro.category,
                    'status': foro.status,
                    'comments':quantity
                }
            }


            return Response(respuesta, status=status.HTTP_200_OK)
            
        elif (self.request.user.rol == 'estudiante' or self.request.user.rol == 'apoderado'):
            queryset = PostForum.objects.filter(forum_id = pk)
            foro = Forum.objects.get(pk=pk)
            serializer = PostSerializer(queryset, many=True)

            ParentComment = ForumComment.objects.all().filter(postforum_id__forum_id= pk)
            quantity = 0

            for comment in ParentComment:
                quantity += 1
                subComment = ForumSubComment.objects.all().filter(forum_comment_id = comment)
                for sub in subComment:
                    quantity += 1
              

            respuesta = {
                'data': serializer.data,
                'adition': {
                    'date':foro.published,
                    'author':foro.author.user.get_full_name(),
                    'category': foro.category,
                    'status': foro.status,
                    'comments':quantity
                }
            }


            return Response(respuesta, status=status.HTTP_200_OK)
            
        else:
            raise PermissionDenied

     
     
class CreatoForumPostView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ForumSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
 
     if (self.request.user.rol == 'profesor'):
        section_instance = Section.objects.get(pk=int(request.data['section']))

        professor_instance = Professor.objects.get(user=self.request.user.id)

        try:
                title = request.data.get('title')
                name = request.data.get('title')
                description = request.data.get('description')
                thumbnail = request.data.get('thumbnail')
                category = request.data.get('category')
                content = request.data.get('content')
                excerpt = request.data.get('excerpt')

                forum = Forum(
                        title = name,
                        description=description,
                        thumbnail=thumbnail,
                        category=category,
                        section_id=section_instance,
                        author=professor_instance
                    )
                forum.save()


                postForum = PostForum(
                    title = title,
                    description = content,
                    excerpt = excerpt,
                    forum_id=forum
           )
                postForum.save()

                if(category == 'apoderado'):
                    noti_instance_ = Notification(
                           user = professor_instance.user,
                           type = 1,
                           issue ='Asignatura: '+section_instance.subject.name+' - Has creado un nuevo Foro',
                           message = 'Foro: "'+title+'"'
                           )
                    noti_instance_.save()
                    users_instance = StudentSection.objects.all().filter(section_id = section_instance)
                    for user_ in users_instance:
                        noti_instance = Notification(
                           user = user_.student_rut.guardian_rut.user,
                           type = 1,
                           issue ='Asignatura: '+section_instance.subject.name+' - Se ha creado un nuevo Foro',
                           message = 'Foro: "'+title+'"'
                           )
                        noti_instance.save()
                elif(category!='apoderado'):
                    noti_instance_ = Notification(
                           user = professor_instance.user,
                           type = 1,
                           issue ='Asignatura: '+section_instance.subject.name+' - Has creado un nuevo Foro',
                           message = 'Foro: "'+title+'"'
                           )
                    noti_instance_.save()
                    users_instance = StudentSection.objects.all().filter(section_id = section_instance)
                    for user_ in users_instance:
                      noti_instance = Notification(
                           user = user_.student_rut.user,
                           type = 1,
                           issue ='Asignatura: '+section_instance.subject.name+' - Se ha creado un nuevo Foro',
                           message = 'Foro: "'+title+'"'
                           )
                      noti_instance.save()
                

                
                return Response({'created': 'created'}, status=status.HTTP_201_CREATED)

        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied

class ForumDeactivateView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = ForumSerializer

     def delete(self, request, pk, *args, **kwargs):
        if (self.request.user.rol == 'profesor'):
            queryset = Forum.objects.get(pk= pk)
            if (queryset.status == 'borrador'):
                queryset.status = 'publicado'
            elif (queryset.status == 'publicado'):
                queryset.status = 'borrador'
            queryset.save()


            return Response({'Deactivate': 'Objeto Desactivado'}, status=status.HTTP_200_OK)

        else:
            raise PermissionDenied

class EditForumPostView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ForumSerializer
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request,pk, *args, **kwargs):
 
     if (self.request.user.rol == 'profesor'):
        try:
                foro_edit = Forum.objects.get(pk=pk)

                title = request.data.get('title')
                description = request.data.get('description')
                thumbnail = request.data.get('thumbnail')
                category = request.data.get('category')
                content = request.data.get('content')
                excerpt = request.data.get('excerpt')

                foro_edit.title = title
                foro_edit.description = description
                if(request.data.get('thumbnail')):
                    foro_edit.thumbnail = thumbnail
                foro_edit.category = category
                foro_edit.save()

                postForum = PostForum.objects.get(forum_id = foro_edit)
                postForum.title = title
                postForum.description= content
                postForum.excerpt = excerpt
                postForum.save()
                return Response({'updated': 'update'}, status=status.HTTP_200_OK)

        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied
     
class GetForumPostView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ForumSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request,pk, *args, **kwargs):
 
     if (self.request.user.rol == 'profesor'):
        try:
                foro_edit = Forum.objects.get(pk=pk)
                postForum = PostForum.objects.get(forum_id = foro_edit)

                respuesta = {
                'id': foro_edit.pk,
                'title': foro_edit.title,
                'description': foro_edit.description,
                'thumbnail': foro_edit.thumbnail.url if foro_edit.thumbnail and foro_edit.thumbnail.url else None,
                'category': foro_edit.category,
                'content': postForum.description,
                'excerpt': postForum.excerpt
            }
                
                return Response(respuesta, status=status.HTTP_200_OK, content_type='application/json; charset=utf-8')


        except (ValidationError, KeyError, Professor.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Section.DoesNotExist:
            return Response({'error': 'La sección no existe'}, status=status.HTTP_404_NOT_FOUND)
        except ParseError as e:
            return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
     else:
                raise PermissionDenied

class ForumListByCourseSection(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,course_id, *args, **kwargs):
        if (self.request.user.rol == 'director'):
            try:
                course = Course.objects.get(id_course=course_id)
            except Course.DoesNotExist:
                return Response({'error': 'El curso especificado no existe'}, status=404)

            sections = Section.objects.filter(course=course)
            total_foros = 0
            result = {
                'course_id': course.id_course,
                'course_name': course.nivel,
                'sections': []
            }

            for section in sections:
                forums = Forum.objects.filter(section_id=section)
                total_foros += forums.count()
                section_data = {
                    'section_id': section.section_id,
                    'section_name': section.name,
                    'foros_publicados': forums.filter(status='publicado').count(),
                    'foros_borradores': forums.filter(status='borrador').count(),
                    'foros': []
                }
                for forum in forums:
                    author_name = forum.author.user.get_full_name()

                    forum_data = {
                        'foro_id': forum.id,
                        'author_id': forum.author.professor_rut,
                        'section_id': section.section_id,
                        'title': forum.title,
                        'thumbnail': forum.thumbnail.url if forum.thumbnail else None,
                        'description': forum.description,
                        'category': forum.category,
                        'published': forum.published,
                        'status': forum.status,
                        'author': author_name
                    }
                    section_data['foros'].append(forum_data)

                result['sections'].append(section_data)

            result['total_foros'] = total_foros

            return Response(result)
        

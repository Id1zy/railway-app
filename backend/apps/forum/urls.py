from django.urls import path
from .views import * 

urlpatterns = [
    path('list/<int:pk>/', ForumListView.as_view()),
    path('get/<int:pk>/', GetForumPostView.as_view()),
    path('list/post/<int:pk>/', ForumPostListView.as_view()),
    path('create/', CreatoForumPostView.as_view()),
    path('edit/<int:pk>/', EditForumPostView.as_view()),
    path('deactivate/<int:pk>/', ForumDeactivateView.as_view()),

    path('<int:pk>/create/comment', CreateCommentView.as_view()),
    path('<int:pk>/list/comment/', CommentListView.as_view()),
    path('comment/<int:pk>/create/subcomment/', CreateSubCommentView.as_view()),
    path('clasificados/', ForumListByCourseSection.as_view(), name='forum-list-by-course-section'),
    path('course/<int:course_id>/', ForumListByCourseSection.as_view(), name='forum-list-by-course-section'),
]
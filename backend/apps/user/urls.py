from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from . import views
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='token_create'), 
    path('user/create/', UserAccountCreateAPIView.as_view(), name='create-user'),
    path('user/list/', UserAccountListAPIView.as_view(), name='list-users'),
    path('user/update/<int:pk>/', UserAccountUpdateAPIView.as_view(), name='update-user'),
    path('user/delete/<int:pk>/', UserAccountDestroyAPIView.as_view(), name='delete-user'),
    path('avatar/', UploadImageView.as_view(), name='avatar-update'),
    path('avatar/get/', GetAvatarView.as_view(), name='avatar-get'),

    path('activate/<int:user_id>/', ActivateUserView.as_view(), name='user-activate'),
    path('deactivate/<int:user_id>/', DeactivateUserView.as_view(), name='user-deactivate'),

#Director
    path('create/director/', CreateDirectorView.as_view(), name='director-create'),
    path('list/director/', ListDirectorView.as_view(), name='director-list'),
    path('get/director/<int:user_id>/', GetDirectorView.as_view(), name='director-get'),
    path('edit/director/<int:user_id>/', EditDirectorView.as_view(), name='director-edit'),
    path('director/upload/', UploadDirectorView.as_view(), name='director-upload'),
    path('director/download/', DownloadDirectorView.as_view(), name='director-download'),
    path('director/dashboard/', directorDash.as_view(), name='director-dashboard'),
#Inspector
    path('create/inspector/', CreateInspectorView.as_view(), name='inspector-create'),
    path('list/inspector/', ListInspectorView.as_view(), name='inspector-list'),
    path('get/inspector/<int:user_id>/', GetInspectorView.as_view(), name='inspector-get'),
    path('edit/inspector/<int:user_id>/', EditInspectorView.as_view(), name='inspector-edit'),
    path('inspector/upload/', UploadInspectorView.as_view(), name='inspector-upload'),
    path('inspector/download/', DownloadInspectorView.as_view(), name='inspector-download'),
#Secretary
    path('create/secretary/', CreateSecretaryView.as_view(), name='secretary-create'),
    path('list/secretary/', ListSecretaryView.as_view(), name='secretary-list'),
    path('get/secretary/<int:user_id>/', GetSecretaryView.as_view(), name='secretary-get'),
    path('edit/secretary/<int:user_id>/', EditSecretaryView.as_view(), name='secretary-edit'),
    path('secretary/upload/', UploadSecretaryView.as_view(), name='secretary-upload'),
    path('secretary/download/', DownloadSecretaryView.as_view(), name='secretary-download'),
#UTP
    path('create/utp/', CreateUTPView.as_view(), name='utp-create'),
    path('list/utp/', ListUTPView.as_view(), name='utp-list'),
    path('get/utp/<int:user_id>/', GetUTPView.as_view(), name='utp-get'),
    path('edit/utp/<int:user_id>/', EditUTPView.as_view(), name='utp-edit'),
    path('utp/upload/', UploadUTPView.as_view(), name='utp-upload'),
    path('utp/download/', DownloadUTPView.as_view(), name='utp-download'),
]

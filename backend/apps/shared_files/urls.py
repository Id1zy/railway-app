from django.urls import path
from .views import * 

urlpatterns = [
    path('list/subject/<int:section_id>/', FolderListView.as_view()), #Trae consigo las carpetas con sus archivos de una sección respectiva
    path('create/subject/<int:section_id>/', CreateFolderView.as_view()), #Crea un archivo en la sección indicada
    path('create/file/<int:folder_id>/', CreateFileView.as_view()),
    path('get/<int:folder_id>/', GetFolderView.as_view()),
    path('get/file/<int:file_id>/', GetFileView.as_view()),
    path('edit/<int:folder_id>/', EditFolderView.as_view()),
    path('edit/file/<int:file_id>/', EditFileView.as_view()),
    path('deactivate/<int:folder_id>/', FolderDeactivateView.as_view()),
    path('deactivate/file/<int:file_id>/', FileDeactivateView.as_view()),
    path('delete/<int:folder_id>/', FolderDeleteView.as_view()),
    path('delete/file/<int:file_id>/', FileDeleteView.as_view()),

   path('download/file/<int:file_id>/', DownloadFileView.as_view()),
]
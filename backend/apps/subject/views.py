from rest_framework import generics
from django.db import transaction
from .models import subject
from .serializers import SubjectSerializer, SubjectCreateSerializer
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework import mixins
from django.http import Http404
from django.core.exceptions import (
    PermissionDenied,
)
from rest_framework import generics
from .models import subject
from django.shortcuts import get_object_or_404
from backend.apps.user.models import * 
from rest_framework.generics import ListAPIView, UpdateAPIView,CreateAPIView,DestroyAPIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.pagination import LimitOffsetPagination

AUTHORIZED = ["profesor","UTP", "administrador"] # Roles autorizados

class SubjectView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = SubjectSerializer

     def get(self, request, *args, **kwargs):
             if(request.user.rol in AUTHORIZED):
                queryset = subject.objects.all()
                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
             else:
                 raise PermissionDenied

     def post(self, request, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            try:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                post = serializer.save()
                # with transaction.atomic():
                #     subject_ = subject(
                #         name=post.name,
                #     )
                #     subject_.save()

                return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
            except ParseError as e:
                return Response({'error': 'Datos JSON mal formados'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            raise PermissionDenied



class SubjectDetailView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = SubjectSerializer

     def get_object(self, pk):
        if(self.request.user.rol in AUTHORIZED):
            try:
                return subject.objects.get(pk=pk)
            except subject.DoesNotExist:
                raise Http404('La Asignatura no Existe')
        else:
            raise PermissionDenied
        
     def get(self, request, pk, *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            queryset = self.get_object(pk)  
            serializer = self.get_serializer(queryset) 

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied
        
     def put(self, request, pk,  *args, **kwargs):
        if(request.user.rol in AUTHORIZED):
            subject = self.get_object(pk)  
            serializer = self.get_serializer(subject, data=request.data) 
            if serializer.is_valid():
                serializer.save() 
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            raise PermissionDenied
        
     def delete(self, request, pk, format=None):
        if(request.user.rol in AUTHORIZED):
            subject = self.get_object(pk)
            subject.is_active= False
            subject.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise PermissionDenied

class LargeResultsSetPagination(LimitOffsetPagination):
    default_limit = 1000

class SubjectListForUTPAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = LargeResultsSetPagination
    
    def get_serializer_class(self):
        user_role = self.request.user.rol
        if user_role == "UTP":
            return SubjectSerializer
        else:
            raise PermissionDenied

    def get_queryset(self):
        user_role = self.request.user.rol

        if user_role not in AUTHORIZED:
            raise PermissionDenied

        if user_role == "UTP":
            utp = get_object_or_404(UTP, user=self.request.user.id)
            return subject.objects.filter(school=utp.school)

        else:
            return subject.objects.none()


class SubjectUpdateAPIView(UpdateAPIView):
    queryset = subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_context(self):
        return {"request": self.request}

    def get_queryset(self):
        user_role = self.request.user.rol

        if user_role not in AUTHORIZED:
            raise PermissionDenied

        if user_role == "UTP":
            utp = get_object_or_404(UTP, user=self.request.user.id)
            return subject.objects.filter(school=utp.school)

        else:
            return subject.objects.none()

class SubjectCreateAPIView(CreateAPIView):
    queryset = subject.objects.all()
    serializer_class = SubjectCreateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_role = self.request.user.rol
        if user_role != "UTP":
            raise PermissionDenied

        utp = get_object_or_404(UTP, user=self.request.user.id)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(school=utp.school)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class SubjectDesactivateAPIView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubjectSerializer
    queryset = subject.objects.all()

    def delete(self, request, *args, **kwargs):
        if self.request.user.rol == "UTP":  
            subject_instance = self.get_object()
            subject_instance.is_active = False
            subject_instance.save()
            return Response({"mensaje": "Asignatura desactivada correctamente."}, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied("No tienes permiso para desactivar esta asignatura.")

class SubjectActivateAPIView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubjectSerializer
    queryset = subject.objects.all()

    def delete(self, request, *args, **kwargs):
        if self.request.user.rol == "UTP":  
            subject_instance = self.get_object()
            subject_instance.is_active = True
            subject_instance.save()
            return Response({"mensaje": "Asignatura activada correctamente."}, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied("No tienes permiso para activar esta asignatura.")

from rest_framework import generics
from .models import school
from .serializers import schoolSerializer
from rest_framework import generics
from django.core.exceptions import (
    PermissionDenied,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from backend.apps.student.models import Student
from backend.apps.professor.models import Professor

class schoolListView(generics.ListCreateAPIView):
    queryset = school.objects.all()
    serializer_class = schoolSerializer


class schoolDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = school.objects.all()
    serializer_class = schoolSerializer


class CreateSchoolView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = schoolSerializer

    def post(self, request, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
          try:

            data = request.data['data']
            rbd_ = data['rbd']
            name_ = data['name']
            address_ = data['address']
            email_ = data['email']
            phone_ = data['phone']

            school_instance = school(
                rbd = rbd_,
                name = name_,
                address = address_,
                email = email_,
                phone = phone_
            )

            school_instance.save()

            return Response({'created': 'created'}, status=status.HTTP_201_CREATED)
          
          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
                raise PermissionDenied
        

class SchoolDeactivateView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = schoolSerializer

     def delete(self, request, school_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):

            queryset = school.objects.get(rbd= school_id)
            if (queryset.is_active == True):
                queryset.is_active = False
            queryset.save()
            return Response({'Chage_Status': 'Changed'}, status=status.HTTP_200_OK)

        else:
            raise PermissionDenied
        
class SchoolActivateView(generics.GenericAPIView):
     permission_classes = [IsAuthenticated]
     serializer_class = schoolSerializer

     def delete(self, request, school_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):

            queryset = school.objects.get(rbd= school_id)
            if (queryset.is_active == False):
                queryset.is_active = True
            queryset.save()
            return Response({'Chage_Status': 'Changed'}, status=status.HTTP_200_OK)

        else:
            raise PermissionDenied
        

class EditSchoolView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = schoolSerializer

    def put(self, request, school_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
          try:
            data = request.data['data']
            school_instance = school.objects.get(rbd = school_id)
            school_instance.name = data['name']
            school_instance.address = data['address']
            school_instance.email = data['email']
            school_instance.phone = data['phone']

            school_instance.save()

            return Response({'updated': 'updated'}, status=status.HTTP_201_CREATED)
          
          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            raise PermissionDenied
        

class GetSchoolView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = schoolSerializer

    def get(self, request, school_id, *args, **kwargs):
        if (self.request.user.rol == 'superuser'):
          try:
            school_instance = school.objects.get(rbd = school_id)
            respuesta = {
                'rbd': school_instance.rbd,
                'name': school_instance.name,
                'address': school_instance.address,
                'email': school_instance.email,
                'phone':school_instance.phone,
            }
                
            return Response(respuesta, status=status.HTTP_200_OK)


          
          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            raise PermissionDenied
        


class GetColor(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = schoolSerializer

    def get(self, request, *args, **kwargs):
        if (self.request.user.rol == 'estudiante'):
          try:
            student_instance = Student.objects.get(user__pk = self.request.user.id)
            respuesta = {
                'color': student_instance.school.color,
            }
                
            return Response(respuesta, status=status.HTTP_200_OK)


          
          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif (self.request.user.rol == 'profesor'):
          try:
            student_instance = Professor.objects.get(user__pk = self.request.user.id)
            respuesta = {
                'color': student_instance.school.color,
            }
                
            return Response(respuesta, status=status.HTTP_200_OK)


          
          except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            raise PermissionDenied

    
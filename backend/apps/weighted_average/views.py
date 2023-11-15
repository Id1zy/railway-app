# DRF imports
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
# Django imports
from django.core.exceptions import PermissionDenied
# Serializers
from .serializers import WAverageModelSerializer
# Models
from .models import weighted_average

AUTHORIZED = ["profesor", "estudiante"]

class WeightedAverageList(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WAverageModelSerializer

    def get_queryset(self):
        if(self.request.user.rol in AUTHORIZED):
            queryset = weighted_average.objects.filter(is_active = True)
            return queryset
        else:
            raise PermissionDenied
        

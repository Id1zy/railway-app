from . import views
from django.urls import path

urlpatterns = [
    path('list/', views.WeightedAverageList.as_view(), name="WeightedAverageList"),
]

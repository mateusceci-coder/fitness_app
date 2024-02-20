from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'exercises/bodybuilding', views.ExerciseViewSet, basename="bodybuilding-exercise")

urlpatterns = [
    path('', include(router.urls)),
]

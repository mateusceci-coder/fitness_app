from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'exercises/crossfit', views.ExerciseViewSet, basename='crossfit-exercise')
router.register(r'workouts/crossfit', views.WorkoutViewSet, basename='crossfit-workout')

urlpatterns = [
    path('', include(router.urls)),
]

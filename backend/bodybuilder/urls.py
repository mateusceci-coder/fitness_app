from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bodybuilder.views import views_exercise, views_workout

router = DefaultRouter()
router.register(r'exercises/bodybuilding',
                views_exercise.ExerciseViewSet, basename="bodybuilding-exercise")
router.register(r'workouts/bodybuilding', views_workout.BodyWorkoutViewSet, basename="bodybuilding-workout")

urlpatterns = router.urls

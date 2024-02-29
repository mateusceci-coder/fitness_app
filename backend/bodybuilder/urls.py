from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bodybuilder.views import views_exercise
from bodybuilder.views.views_workout import WorkoutExerciseList, WorkoutExerciseDetail, BodyWorkoutList, BodyWorkoutDetail

router = DefaultRouter()
router.register(r'exercises/bodybuilding',
                views_exercise.ExerciseViewSet, basename="bodybuilding-exercise")

urlpatterns = [
    path('', include(router.urls)),
    path('workouts/exercises/', WorkoutExerciseList.as_view(),
         name='workout-exercise-list'),
    path('workouts/exercises/<int:pk>/', WorkoutExerciseDetail.as_view(),
         name='workout-exercise-detail'),
    path('workouts/', BodyWorkoutList.as_view(), name='body-workout-list'),
    path('workouts/<int:pk>/', BodyWorkoutDetail.as_view(),
         name='body-workout-detail'),
]

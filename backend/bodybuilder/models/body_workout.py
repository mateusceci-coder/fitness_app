from django.db import models
from django.conf import settings
from .body_exercise import BodyExercise
from django.contrib.auth.models import User
    
class BodyWorkout(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_body_workouts')
    exercises = models.ManyToManyField('BodyExercise', through='WorkoutExercise')

    def __str__(self):
        return self.name
    
class WorkoutExercise(models.Model):
    workout = models.ForeignKey(BodyWorkout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(BodyExercise, on_delete=models.CASCADE)
    series = models.IntegerField()
    repetitions = models.IntegerField()

    def __str__(self):
        return f"{self.workout.name} - {self.exercise.name}"
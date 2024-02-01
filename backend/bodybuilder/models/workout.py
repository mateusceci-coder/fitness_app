from django.db import models
from django.conf import settings
from .exercise import Exercise
from django.contrib.auth.models import User
    
class Workout(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    exercises = models.ManyToManyField(Exercise)
    series = models.IntegerField()
    repetitions = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
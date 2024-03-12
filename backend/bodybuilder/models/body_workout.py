import uuid
from django.db import models
from django.conf import settings
from .body_exercise import EquipmentChoices
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.db import IntegrityError

class Body_Exercise_Workout(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_body_exercise')
    created_at = models.DateTimeField(auto_now_add=True)
    equipment = models.CharField(max_length=100, choices=EquipmentChoices.choices)
    reps = models.IntegerField()
    series = models.IntegerField()
    rep_max = models.FloatField(blank=True, null=True)
    slug = models.SlugField(max_length=150, blank=True, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.created_by.id}-{self.name}")
        try:
            super().save(*args, **kwargs)
        except IntegrityError:
            self.slug = slugify(f"{self.created_by.id}-{self.name}-{uuid.uuid4()}")
            super().save(*args, **kwargs)

class BodyWorkout(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(
    User, on_delete=models.CASCADE, related_name='created_body_workouts')
    exercises = models.ManyToManyField(
        Body_Exercise_Workout, through='Workout_Exercise_Bodybuilding')

    def __str__(self):
        return self.name


class Workout_Exercise_Bodybuilding(models.Model):
    workout = models.ForeignKey(BodyWorkout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Body_Exercise_Workout, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.workout.name} - {self.exercise.name}"




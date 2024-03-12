import uuid
from django.db import models
from crossfit.models.cros_exercise import EquipmentChoices
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.db import IntegrityError



class Cross_Exercise_Workout(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_by')
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    equipment = models.CharField(max_length=100, choices=EquipmentChoices.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    weight_for_women = models.FloatField(null=True, blank=True)
    weight_for_men = models.FloatField(null=True, blank=True)
    reps = models.IntegerField()

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

class CrosWorkout(models.Model):
    class ExecutionType(models.TextChoices):
        FOR_TIME = 'FT', 'For Time'
        AMRAP = 'AMRAP', 'As Many Rounds as Possible'

    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_workouts')
    exercises = models.ManyToManyField(Cross_Exercise_Workout, through='WorkoutExercise')
    execution_type = models.CharField(max_length=10, choices=ExecutionType.choices)
    rounds = models.IntegerField(null=True, blank=True)
    time_cap = models.DurationField()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.execution_type == self.ExecutionType.AMRAP:
            self.rounds = None  # Garante que rounds seja nulo para AMRAP
        super().save(*args, **kwargs)

class WorkoutExercise(models.Model):
    workout = models.ForeignKey(CrosWorkout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Cross_Exercise_Workout, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.workout.name} - {self.exercise.name}"

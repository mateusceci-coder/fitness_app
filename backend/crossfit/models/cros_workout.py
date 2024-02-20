from django.db import models
from .cros_exercise import CrossExercise
from crossfit.models.cros_exercise import CrossExercise
from django.contrib.auth.models import User
class CrosWorkout(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_workouts')
    exercises = models.ManyToManyField('CrossExercise', through='WorkoutExercise')
    execution_type = models.CharField(max_length=10, choices=[('FT', 'For Time'), ('AMRAP', 'As Many Rounds as Possible')])
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
    exercise = models.ForeignKey(CrossExercise, on_delete=models.CASCADE)
    weight_for_women = models.FloatField()
    weight_for_men = models.FloatField()

    def __str__(self):
        return f"{self.workout.name} - {self.exercise.name}"

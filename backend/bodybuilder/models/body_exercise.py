from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class EquipmentChoices(models.TextChoices):
    DUMBBELL = 'Dumbbell'
    BARBELL = 'Barbell'
    MACHINE = 'Machine'
    BODYWEIGHT = 'Bodyweight'
    OTHER = 'Other'

class BodyExercise(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, blank=True, unique=True)
    equipment = models.CharField(max_length=100, choices=EquipmentChoices.choices)
    rep_max = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.created_by.id}-{self.name}")
        super().save(*args, **kwargs)
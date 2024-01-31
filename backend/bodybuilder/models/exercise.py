from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Exercise(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    equipment = models.CharField(max_length=100)
    rep_max = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

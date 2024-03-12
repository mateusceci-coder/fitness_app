from rest_framework import viewsets
from bodybuilder.models.body_workout import BodyWorkout
from bodybuilder.serializers.body_workout import BodyWorkoutSerializer

class BodyWorkoutViewSet(viewsets.ModelViewSet):
    queryset = BodyWorkout.objects.all()
    serializer_class = BodyWorkoutSerializer


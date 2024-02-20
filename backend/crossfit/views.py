from rest_framework import viewsets
from crossfit.models.cros_exercise import CrossExercise
from crossfit.models.cros_workout import CrosWorkout
from crossfit.serializers.exercises import CrosExerciseSerializer
from crossfit.serializers.workout import WorkoutSerializer
from rest_framework.permissions import IsAuthenticated

class ExerciseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CrosExerciseSerializer

    def get_queryset(self):
        user = self.request.user
        return CrossExercise.objects.select_related('created_by').filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class WorkoutViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutSerializer

    def get_queryset(self):
        user = self.request.user
        return CrosWorkout.objects.select_related('created_by').filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

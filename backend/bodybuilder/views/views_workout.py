from rest_framework import viewsets
from bodybuilder.models.body_workout import BodyWorkout
from bodybuilder.serializers.body_workout import BodyWorkoutSerializer
from rest_framework.permissions import IsAuthenticated

class BodyWorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = BodyWorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BodyWorkout.objects.select_related('created_by').filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
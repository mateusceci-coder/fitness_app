from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


from bodybuilder.models.exercise import Exercise
from bodybuilder.serializers.exercise import ExerciseSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Exercise.objects.select_related('created_by').filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

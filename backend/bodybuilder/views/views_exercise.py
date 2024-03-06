from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


from bodybuilder.models.body_exercise import BodyExercise
from bodybuilder.serializers.body_exercise import BodyExerciseSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    serializer_class = BodyExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BodyExercise.objects.select_related('created_by').filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

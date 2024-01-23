from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


from bodybuilder.models.exercise import Exercise
from bodybuilder.serializers.exercise import ExerciseSerializer

# Create your views here.
class ListExercises(ListAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

@permission_classes([IsAuthenticated])
class CreateExercises(CreateAPIView):
    serializer_class = ExerciseSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
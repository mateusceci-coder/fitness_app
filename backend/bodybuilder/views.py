from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


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

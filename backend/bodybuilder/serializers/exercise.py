from rest_framework import serializers
from bodybuilder.models.exercise import Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Exercise
        fields = ['id', 'created_by', 'name', 'equipment', 'rep_max', 'created_at']

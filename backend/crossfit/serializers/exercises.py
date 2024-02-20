from rest_framework import serializers
from crossfit.models.cros_exercise import CrossExercise

class CrosExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrossExercise
        fields = ['id', 'created_by', 'name', 'equipment', 'rep_max', 'created_at']
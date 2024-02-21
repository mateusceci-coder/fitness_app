from django.forms import ValidationError
from rest_framework import serializers
from crossfit.models.cros_exercise import CrossExercise, EquipmentChoices

class CrosExerciseSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    class Meta:
        model = CrossExercise
        fields = ['id', 'created_by', 'name', 'equipment', 'rep_max', 'created_at']

    def validate_rep_max(self, value):
        if value < 0:
            raise ValidationError("Rep max cannot be negative")
        return value

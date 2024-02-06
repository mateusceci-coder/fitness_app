from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from bodybuilder.models.exercise import Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Exercise
        fields = ['id', 'created_by', 'name', 'equipment', 'rep_max', 'created_at']

    def validate_rep_max(self, value):
        if value < 0:
            raise ValidationError("Rep max cannot be negative")
        return value
    
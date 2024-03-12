from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from bodybuilder.models.body_exercise import BodyExercise

class BodyExerciseSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    class Meta:
        model = BodyExercise
        fields = ['id', 'name', 'equipment', 'rep_max', 'created_at','created_by']

    def validate_rep_max(self, value):
        if value < 0:
            raise ValidationError("Rep max cannot be negative")
        return value
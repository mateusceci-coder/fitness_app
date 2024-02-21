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
    
    # def validate_name(self, value):
    #     if value == '':
    #         raise ValidationError("This field is required.")
    #     return value
    
    def validate_equipment(self, value):
        if value not in EquipmentChoices.choices:
            raise ValidationError("Invalid equipment")
        return value
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from bodybuilder.models.body_exercise import BodyExercise

class BodyExerciseSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = BodyExercise
        fields = ['id', 'name', 'equipment', 'rep_max', 'created_at']

    def validate_rep_max(self, value):
        if value < 0:
            raise ValidationError("Rep max cannot be negative")
        return value

    def create(self, validated_data):
        # Acessa o usuário autenticado a partir do contexto do request
        user = self.context['request'].user
        #validated_data.pop('created_by', None)
        # Define o usuário autenticado como `created_by` ao criar o objeto BodyExercise
        body_exercise = BodyExercise.objects.create(created_by=user, **validated_data)
        return body_exercise
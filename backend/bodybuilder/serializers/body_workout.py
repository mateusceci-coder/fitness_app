from rest_framework import serializers
from django.db import transaction
from bodybuilder.models.body_exercise import BodyExercise
from bodybuilder.models.body_workout import BodyWorkout, BodyWorkoutExercise
from . import body_exercise


class BodyWorkoutExerciseSerializer(serializers.ModelSerializer):
    exercise = body_exercise.BodyExerciseSerializer()
    workout = serializers.PrimaryKeyRelatedField(queryset=BodyWorkout.objects.all(), required=False)
    class Meta:
        model = BodyWorkoutExercise
        fields = ['workout', 'exercise', 'series', 'repetitions']

class BodyWorkoutSerializer(serializers.ModelSerializer):
    exercises = BodyWorkoutExerciseSerializer(many=True, source='bodyworkoutexercise_set')
    created_by = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = BodyWorkout
        fields = ['id', 'name', 'exercises', 'created_by']
    
    def create(self, validated_data):
        exercises_data = validated_data.pop('bodyworkoutexercise_set', [])
        workout = BodyWorkout.objects.create(**validated_data, created_by=self.context['request'].user)

        with transaction.atomic():
            for exercise_data in exercises_data:
                exercise_info = exercise_data.pop('exercise')
                exercise, created = BodyExercise.objects.get_or_create(
                    **exercise_info,
                    defaults={'created_by': workout.created_by}
                )

                BodyWorkoutExercise.objects.create(workout=workout, exercise=exercise, **exercise_data)

        return workout

    def update(self, instance, validated_data):
        exercises_data = validated_data.pop('exercises')
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        # Update existing exercises and create new ones
        existing_exercise_ids = [exercise.id for exercise in instance.exercises.all()]
        for exercise_data in exercises_data:
            if exercise_data['id'] in existing_exercise_ids:
                # Update existing exercise
                exercise = BodyExercise.objects.get(pk=exercise_data['id'])
                for field, value in exercise_data.items():
                    if field != 'id':
                        setattr(exercise, field, value)
                exercise.save()
            else:
                # Create new exercise
                exercise, created = BodyExercise.objects.get_or_create(**exercise_data)
                BodyWorkoutExercise.objects.create(workout=instance, exercise=exercise, **exercise_data)

        # Delete removed exercises
        for exercise in instance.exercises.all():
            if exercise.id not in existing_exercise_ids:
                exercise.delete()

        return instance

from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from bodybuilder.models.body_workout import BodyExercise, BodyWorkout, WorkoutExercise
from .body_exercise import BodyExerciseSerializer


class WorkoutExerciseSerializer(serializers.ModelSerializer):
    exercise = BodyExerciseSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ['id', 'workout', 'exercise', 'series', 'repetitions']


class BodyWorkoutSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseSerializer(many=True)

    class Meta:
        model = BodyWorkout
        fields = ['id', 'name', 'created_by', 'exercises']
        validators = [
            UniqueTogetherValidator(queryset=BodyWorkout.objects.all(), fields=['name', 'created_by'])
        ]

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        workout = BodyWorkout.objects.create(**validated_data, created_by=self.context['request'].user)
        for exercise_data in exercises_data:
            exercise = BodyExercise.objects.create(**exercise_data, created_by=self.context['request'].user)
            WorkoutExercise.objects.create(workout=workout, exercise=exercise, **exercise_data)
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
                WorkoutExercise.objects.create(workout=instance, exercise=exercise, **exercise_data)

        # Delete removed exercises
        for exercise in instance.exercises.all():
            if exercise.id not in existing_exercise_ids:
                exercise.delete()

        return instance

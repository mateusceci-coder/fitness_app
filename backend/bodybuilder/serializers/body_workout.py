from rest_framework import serializers
from bodybuilder.models.body_workout import BodyWorkout, Body_Exercise_Workout


class WorkoutExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Body_Exercise_Workout
        fields = ['id', 'name', 'reps', 'series', 'equipment','rep_max']


class BodyWorkoutSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseSerializer(many=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = BodyWorkout
        fields = ['id', 'name', 'exercises', 'created_by']

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        user = self.context['request'].user
        workout = BodyWorkout.objects.create(created_by=user, **validated_data)
        for exercise_data in exercises_data:
            exercise = Body_Exercise_Workout.objects.create(
            **exercise_data, created_by=workout.created_by)
            workout.exercises.add(exercise)
        return workout

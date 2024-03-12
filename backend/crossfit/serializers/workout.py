from rest_framework import serializers
from crossfit.models.cros_workout import Cross_Exercise_Workout
from crossfit.models.cros_workout import CrosWorkout


class CrossExerciseWorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cross_Exercise_Workout
        fields = ['id', 'name', 'equipment', 'weight_for_women', 'weight_for_men', 'reps']

class CrosWorkoutSerializer(serializers.ModelSerializer):
    exercises = CrossExerciseWorkoutSerializer(many=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = CrosWorkout
        fields = ['id', 'name', 'created_by', 'exercises', 'execution_type', 'rounds', 'time_cap']

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        crosWorkout = CrosWorkout.objects.create(**validated_data)
        for exercise_data in exercises_data:
            exercise = Cross_Exercise_Workout.objects.create(**exercise_data, created_by=crosWorkout.created_by)
            crosWorkout.exercises.add(exercise)
        return crosWorkout


    def update(self, instance, validated_data):
        # Add custom update logic here
        # Be sure to handle the 'exercises' relationship if needed
        return super().update(instance, validated_data)


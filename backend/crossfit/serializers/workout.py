from rest_framework import serializers
from crossfit.models.cros_workout import CrosWorkout, WorkoutExercise

class WorkoutExerciseSerializer(serializers.ModelSerializer):
    workout = serializers.PrimaryKeyRelatedField(queryset=CrosWorkout.objects.all(), required=False)
    class Meta:
        model = WorkoutExercise
        fields = ['workout', 'exercise', 'weight_for_women', 'weight_for_men', 'reps']

class WorkoutSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseSerializer(source='workoutexercise_set', many=True)
    created_by = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = CrosWorkout
        fields = ['id', 'name', 'created_by', 'execution_type', 'rounds', 'time_cap', 'exercises']

    def create(self, validated_data):
        exercises_data = validated_data.pop('workoutexercise_set', [])
        workout = CrosWorkout.objects.create(**validated_data)
        for exercise_data in exercises_data:
            exercise_data['workout'] = workout
            WorkoutExercise.objects.create(**exercise_data)
        return workout

    def update(self, instance, validated_data):
        exercises_data = validated_data.pop('workoutexercise_set', [])
        instance.name = validated_data.get('name', instance.name)
        instance.execution_type = validated_data.get('execution_type', instance.execution_type)
        instance.rounds = validated_data.get('rounds', instance.rounds)
        instance.time_cap = validated_data.get('time_cap', instance.time_cap)
        instance.save()

        existing_exercises_ids = [exercise.exercise.id for exercise in instance.workoutexercise_set.all()]
        for exercise_data in exercises_data:
            exercise_id = exercise_data.get('exercise').id
            if exercise_id in existing_exercises_ids:
                workout_exercise = WorkoutExercise.objects.get(workout=instance, exercise_id=exercise_id)
                workout_exercise.weight_for_women = exercise_data.get('weight_for_women', workout_exercise.weight_for_women)
                workout_exercise.weight_for_men = exercise_data.get('weight_for_men', workout_exercise.weight_for_men)
                workout_exercise.reps = exercise_data.get('reps', workout_exercise.reps)
                workout_exercise.save()
            else:
                WorkoutExercise.objects.create(workout=instance,**exercise_data)
        instance.workoutexercise_set.exclude(exercise_id__in=[data['exercise'].id for data in exercises_data]).delete()

        return instance

from rest_framework import serializers
from crossfit.serializers.exercises import CrosExerciseSerializer
from crossfit.models.cros_exercise import CrossExercise
from crossfit.serializers.exercises import CrosExerciseSerializer
from crossfit.models.cros_exercise import CrossExercise
from crossfit.models.cros_workout import CrosWorkout, WorkoutExercise


class WorkoutExerciseSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    workout = serializers.PrimaryKeyRelatedField(
        queryset=CrosWorkout.objects.all(), required=False)
    workout = serializers.PrimaryKeyRelatedField(
        queryset=CrosWorkout.objects.all(), required=False)
=======
    workout = serializers.PrimaryKeyRelatedField(queryset=CrosWorkout.objects.all(), required=False)
    workout = serializers.PrimaryKeyRelatedField(queryset=CrosWorkout.objects.all(), required=False)
    workout = serializers.PrimaryKeyRelatedField(queryset=CrosWorkout.objects.all(), required=False)
    workout = serializers.PrimaryKeyRelatedField(queryset=CrosWorkout.objects.all(), required=False)
>>>>>>> e16cbc2 (merging)
    exercise = CrosExerciseSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ['exercise', 'weight_for_women', 'weight_for_men']

class WorkoutSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseSerializer(
        source='workoutexercise_set', many=True)
    created_by = serializers.CharField(
        source='created_by.username', read_only=True)

    class Meta:
        model = CrosWorkout
        fields = ['id', 'name', 'created_by', 'execution_type',
                  'rounds', 'time_cap', 'exercises']

    def create(self, validated_data):
        exercises_data = validated_data.pop('workoutexercise_set', [])
        exercises_data = validated_data.pop('workoutexercise_set', [])
        exercises_data = validated_data.pop('workoutexercise_set', [])
        workout = CrosWorkout.objects.create(**validated_data)

        for exercise_data in exercises_data:
<<<<<<< HEAD
            exercise_serializer = CrosExerciseSerializer(
                data=exercise_data['exercise'])
            if exercise_serializer.is_valid():
                exercise = exercise_serializer.save(
                    created_by=workout.created_by)
                WorkoutExercise.objects.create(
                    workout=workout,
                    exercise=exercise,
                    weight_for_women=exercise_data.get('weight_for_women'),
                    weight_for_men=exercise_data.get('weight_for_men'),
                    reps=exercise_data.get('reps')
                )
            else:
                raise serializers.ValidationError(exercise_serializer.errors)

=======
            exercise_data['workout'] = workout
            WorkoutExercise.objects.create(**exercise_data)
            exercise_data['workout'] = workout
            WorkoutExercise.objects.create(**exercise_data)
>>>>>>> e16cbc2 (merging)
        return workout

    def update(self, instance, validated_data):
        exercises_data = validated_data.pop('workoutexercise_set', [])
        exercises_data = validated_data.pop('workoutexercise_set', [])
        exercises_data = validated_data.pop('workoutexercise_set', [])
        instance.name = validated_data.get('name', instance.name)
        instance.execution_type = validated_data.get(
            'execution_type', instance.execution_type)
        instance.rounds = validated_data.get('rounds', instance.rounds)
        instance.time_cap = validated_data.get('time_cap', instance.time_cap)
        instance.save()

<<<<<<< HEAD
        existing_exercises_ids = [
            exercise.exercise.id for exercise in instance.workoutexercise_set.all()]
        existing_exercises_ids = [
            exercise.exercise.id for exercise in instance.workoutexercise_set.all()]
        existing_exercises_ids = [
            exercise.exercise.id for exercise in instance.workoutexercise_set.all()]
=======
        existing_exercises_ids = [exercise.exercise.id for exercise in instance.workoutexercise_set.all()]
        existing_exercises_ids = [exercise.exercise.id for exercise in instance.workoutexercise_set.all()]
        existing_exercises_ids = [exercise.exercise.id for exercise in instance.workoutexercise_set.all()]
>>>>>>> e16cbc2 (merging)
        for exercise_data in exercises_data:
            exercise_id = exercise_data.get('exercise').id
            exercise = WorkoutExercise.objects.get(workout=instance, exercise_id=exercise_id)
            exercise.weight_for_women = exercise_data.get('weight_for_women', exercise.weight_for_women)
            exercise.weight_for_men = exercise_data.get('weight_for_men', exercise.weight_for_men)
            exercise.save()

        return instance

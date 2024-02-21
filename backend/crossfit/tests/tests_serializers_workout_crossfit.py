from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from crossfit.models.cros_workout import CrossExercise, CrosWorkout, WorkoutExercise
from crossfit.serializers.workout import WorkoutExerciseSerializer, WorkoutSerializer
from datetime import timedelta

class WorkoutExerciseSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='123456')
        self.cross_exercise = CrossExercise.objects.create(
            created_by=self.user,
            name='Test Exercise',
            equipment='Dumbbell',
            rep_max=100
        )
        self.cros_workout = CrosWorkout.objects.create(
            name='Test Workout',
            created_by=self.user,
            execution_type='FT',
            rounds=5,
            time_cap=timedelta(minutes=30)
        )
        self.workout_exercise = WorkoutExercise.objects.create(
            workout=self.cros_workout,
            exercise=self.cross_exercise,
            weight_for_women=50.0,
            weight_for_men=70.0
        )

    def test_workout_exercise_serialization(self):
        serializer = WorkoutExerciseSerializer(self.workout_exercise)
        data = serializer.data
        self.assertEqual(data['weight_for_women'], 50.0)
        self.assertEqual(data['weight_for_men'], 70.0)

    def test_workout_exercise_deserialization(self):
        data = {
            'workout': self.cros_workout.id,
            'exercise': self.cross_exercise.id,
            'weight_for_women': 55.0,
            'weight_for_men': 75.0
        }
        serializer = WorkoutExerciseSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        new_workout_exercise = serializer.save()
        self.assertEqual(new_workout_exercise.weight_for_women, 55.0)
        self.assertEqual(new_workout_exercise.weight_for_men, 75.0)


class WorkoutSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='123456')
        self.cross_exercise = CrossExercise.objects.create(
            created_by=self.user,
            name='Test Exercise',
            equipment='Dumbbell',
            rep_max=100
        )
        self.cros_workout = CrosWorkout.objects.create(
            name='Test Workout',
            created_by=self.user,
            execution_type='FT',
            rounds=5,
            time_cap=timedelta(minutes=30)
        )
        self.workout_exercise = WorkoutExercise.objects.create(
            workout=self.cros_workout,
            exercise=self.cross_exercise,
            weight_for_women=50.0,
            weight_for_men=70.0
        )

    def test_workout_serialization(self):
        serializer = WorkoutSerializer(self.cros_workout)
        data = serializer.data
        self.assertEqual(data['name'], 'Test Workout')
        self.assertEqual(len(data['exercises']), 1)  # Verifique se há 1 exercício relacionado

    def test_workout_creation(self):
        exercise_data = {
            'exercise': self.cross_exercise.id,
            'weight_for_women': 60.0,
            'weight_for_men': 80.0
        }
        workout_data = {
            'name': 'New Workout',
            'created_by': self.user.username,
            'execution_type': 'AMRAP',
            'exercises': [exercise_data],
            'time_cap': '00:30:00'
        }
        serializer = WorkoutSerializer(data=workout_data)
        self.assertTrue(serializer.is_valid())
        new_workout = serializer.save(created_by=self.user)
        self.assertEqual(new_workout.name, 'New Workout')
        self.assertEqual(new_workout.exercises.count(), 1)

    def test_workout_update(self):
        new_exercise = CrossExercise.objects.create(
            created_by=self.user,
            name='New Exercise',
            equipment='Kettlebell',
            rep_max=50
        )
        exercise_data = {
            'exercise': new_exercise.id,
            'weight_for_women': 65.0,
            'weight_for_men': 85.0
        }
        update_data = {
            'name': 'Updated Workout',
            'execution_type': self.cros_workout.execution_type,
            'rounds': self.cros_workout.rounds,
            'time_cap': str(self.cros_workout.time_cap),
            'exercises': [exercise_data]
        }
        serializer = WorkoutSerializer(self.cros_workout, data=update_data)
        serializer.is_valid()
        self.assertTrue(serializer.is_valid())
        updated_workout = serializer.save()
        self.assertEqual(updated_workout.name, 'Updated Workout')
        self.assertEqual(updated_workout.exercises.count(), 1)  # Assumindo que você substitui o exercício existente


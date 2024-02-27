from rest_framework.test import APITestCase, APIClient, APIRequestFactory
from rest_framework.authtoken.models import Token
from rest_framework import status
from factories.test_factories import UserFactory, BodyExerciseFactory, WorkoutExerciseFactory, BodyWorkoutFactory
from bodybuilder.models.body_workout import BodyExercise, BodyWorkout, BodyWorkoutExercise
from bodybuilder.serializers.body_workout import  BodyWorkoutExerciseSerializer, BodyWorkoutSerializer


# class BodyExerciseSerializerTestCase(APITestCase):

#     def setUp(self):
#         self.user = UserFactory()
#         self.client.force_authenticate(self.user)

#     def test_valid_serializer(self):
#         exercise = BodyExerciseFactory()
#         serializer = BodyExerciseSerializer(exercise)
#         self.assertEqual(serializer.data, {
#             'id': exercise.id,
#             'created_by': self.user.username,
#             'name': exercise.name,
#             'equipment': exercise.equipment,
#             'rep_max': exercise.rep_max,
#             'created_at': exercise.created_at.isoformat()
#         })

#     def test_create_exercise(self):
#         exercise = BodyExerciseFactory()
#         data = {
#             'name': 'Barbell Squat',
#             'equipment': 'Barbell',
#             'rep_max': 100,
#             'created_by': self.user
#         }
#         serializer = BodyExerciseSerializer(data=data)
#         if not serializer.is_valid():
#             print('\n\n', serializer.errors, '\n\n')
#         self.assertTrue(serializer.is_valid())
#         exercise = serializer.save()
#         self.assertEqual(exercise.name, data['name'])
#         self.assertEqual(exercise.equipment, data['equipment'])
#         self.assertEqual(exercise.rep_max, data['rep_max'])
#         self.assertEqual(exercise.created_by, data['created_by'])


class WorkoutExerciseSerializerTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.client.force_authenticate(self.user)
        self.workout = BodyWorkoutFactory(created_by=self.user)
        self.exercise = BodyExerciseFactory()
        self.workout_exercise = WorkoutExerciseFactory(workout=self.workout, exercise=self.exercise)

    def test_valid_serializer(self):
        serializer = BodyWorkoutExerciseSerializer(self.workout_exercise)
        self.assertEqual(serializer.data, {
            'id': self.workout_exercise.id,
            'workout': self.workout.id,
            'exercise': self.exercise.id,
            'series': self.workout_exercise.series,
            'repetitions': self.workout_exercise.repetitions
        })


class BodyWorkoutSerializerTestCase(APITestCase):
    def setUp(self):
        super().setUp()
        self.client = APIClient()
        self.user = UserFactory.create()
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.workout = BodyWorkoutFactory(created_by=self.user)
        self.exercise = BodyExerciseFactory()
        self.factory = APIRequestFactory()
        self.request = self.factory.get('/workout/')
        self.request.user = self.user
        # WorkoutExerciseFactory(workout=self.workout, exercise=self.exercise)

    def test_valid_serializer(self):
        serializer = BodyWorkoutSerializer(self.workout)
        self.assertEqual(serializer.data, {
            'id': self.workout.id,
            'workout': self.workout.name,
            'created_by': self.user.username,
            'exercises': [
                {"exercise":
                    {'id': self.exercise.id,
                    'created_by': self.user.username,
                    'name': self.exercise.name,
                    'equipment': self.exercise.equipment,
                    'rep_max': self.exercise.rep_max,
                    'created_at': self.exercise.created_at.isoformat(),
                    },
                    'series': 1,  # Default value for series
                    'repetitions': 1  # Default value for repetitions
                }
            ]
        })

    def test_create_workout_with_new_exercise(self):
        data = {
            'name': 'New Workout',  # Nome do treino
            # Não precisa incluir 'created_by' aqui se estiver usando o usuário do request
            'exercises': [
                {
                    'exercise': {
                    'name': 'New Exercise',  # Nome do exercício
                    'equipment': 'Bodyweight',  # Equipamento usado
                    'rep_max': 20,  # Máximo de repetições
                    },
                    'series': 3,  # Número de séries
                    'repetitions': 10,  # Número de repetições
                    # 'workout' não precisa ser incluído, será associado automaticamente
                }
            ]
        }
        serializer = BodyWorkoutSerializer(data=data, context={'request': self.request})
        self.assertTrue(serializer.is_valid(), serializer.errors)
        workout = serializer.save()
        self.assertEqual(workout.name, data['name'])
        self.assertEqual(workout.created_by, self.user)
        self.assertEqual(len(workout.exercises.all()), 1)
        exercise = workout.exercises.all()[0].exercise
        self.assertEqual(exercise.name, data['exercises'][0]['exercise']['name'])
        self.assertEqual(exercise.equipment, data['exercises'][0]['exercise']['equipment'])
        self.assertEqual(exercise.rep_max, data['exercises'][0]['exercise']['rep_max'])
    

    def test_update_workout_with_existing_exercise(self):
        data = {
            'name': 'Updated Workout',
            'exercises': [
                {
                    'id': self.exercise.id,
                    'name': 'Updated Exercise',
                    'equipment': 'BARBELL',
                    'rep_max': 120
                }
            ]
        }
        serializer = BodyWorkoutSerializer(self.workout, data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        serializer.save()
        self.assertEqual(self.workout.name, data['name'])
        self.assertEqual(len(self.workout.exercises.all()), 1)
        exercise = self.workout.exercises.all()[0]
        self.assertEqual(exercise.name, data['exercises'][0]['name'])
        self.assertEqual(exercise.equipment, data['exercises'][0]['equipment'])
        self.assertEqual(exercise.rep_max, data['exercises'][0]['rep_max'])

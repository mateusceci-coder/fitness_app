from rest_framework.test import APITestCase, APIRequestFactory
from django.urls import reverse
from factories.test_factories import UserFactory  # Importe sua UserFactory
from bodybuilder.serializers.body_exercise import BodyExerciseSerializer

class BodyExerciseSerializerTest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserFactory()  # Cria um usuário de teste
        self.view_name = 'workout-exercise-list'  # Substitua pelo nome da sua view

    def test_create_body_exercise(self):
        url = reverse(self.view_name)
        data = {
            'name': 'Test Exercise',
            'equipment': 'Dumbbell',
            'rep_max': 10,
        }
        request = self.factory.post(url, data)
        request.user = self.user  # Define o usuário no request

        serializer = BodyExerciseSerializer(data=data, context={'request': request})
        self.assertTrue(serializer.is_valid())
        body_exercise = serializer.save()

        self.assertEqual(body_exercise.created_by, self.user)
        # Outras asserções conforme necessário

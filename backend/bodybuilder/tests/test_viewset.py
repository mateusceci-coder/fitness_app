from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from bodybuilder.models import Exercise
from factories.test_factories import UserFactory
from rest_framework.authtoken.models import Token

class ExerciseViewSetTest(APITestCase):

    def setUp(self):
        self.user = UserFactory.create()
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_create_exercise(self):
        url = reverse('bodybuilding-exercise-list')
        data = {
            'name': 'Push Up',
            'equipment': 'Bodyweight',
            'rep_max': 10.0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Exercise.objects.count(), 1)
        self.assertEqual(Exercise.objects.get().name, 'Push Up')


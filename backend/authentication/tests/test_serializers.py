from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from authentication.models import Profile
from authentication.serializers import ProfileSerializer
import datetime

from authentication.factories.test_factories import UserFactory

class ProfileSerializerTestCase(APITestCase):

    def setUp(self):
        super().setUp()
        self.client = APIClient()
        self.user = UserFactory.create()
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_serializer_with_empty_data(self):
        serializer = ProfileSerializer(data={})
        self.assertFalse(serializer.is_valid())
        self.assertIn('birthday', serializer.errors)  # Birthday é um campo obrigatório

    def test_serializer_with_valid_data(self):
        profile = Profile.objects.get(user=self.user)
        valid_data = {
            'id': profile.id,
            'user': self.user.id,
            'birthday': '1990-01-01',
            'height': 180,
            'weight': 70,
            'gender': 'Male'
        }
        serializer = ProfileSerializer(instance=profile, data=valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_birthday_validation(self):
        data = {
            'birthday': datetime.date.today() + datetime.timedelta(days=1)  # Data no futuro
        }
        serializer = ProfileSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('birthday', serializer.errors)

        data['birthday'] = datetime.date(year=1949, month=12, day=31)  # Data antes de 1950
        serializer = ProfileSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('birthday', serializer.errors)

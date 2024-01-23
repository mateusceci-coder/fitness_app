from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from authentication.factories.test_factories import ProfileFactory

from django.contrib.auth.models import User
from authentication.models import Profile

class ProfileUpdateTestCase(APITestCase):
    def setUp(self):
        self.profile = ProfileFactory()
        self.update_url = reverse('profile-update', kwargs={'pk': self.profile.pk})

    def test_profile_update(self):
        data = {
            'user': self.profile.user.id,
            'birthday': '1990-01-01',
            'height': 180.5,
            'weight': 75.0,
            'gender': 'Male'
        }
        print(data)
        response = self.client.put(self.update_url, data)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.birthday.strftime('%Y-%m-%d'), data['birthday'])
        self.assertEqual(self.profile.height, data['height'])
        self.assertEqual(self.profile.weight, data['weight'])
        self.assertEqual(self.profile.gender, data['gender'])
    
    def tearDown(self):
        User.objects.all().delete()
        Profile.objects.all().delete()
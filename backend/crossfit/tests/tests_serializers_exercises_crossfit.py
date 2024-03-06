from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from factories.test_factories import UserFactory
from crossfit.models.cros_exercise import CrossExercise, EquipmentChoices
from crossfit.serializers.exercises import CrosExerciseSerializer

class ProfileSerializerTestCase(APITestCase):

    def setUp(self):
        super().setUp()
        self.client = APIClient()
        self.user = UserFactory.create()
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_serializer_data(self):
        user = self.user
        exercise = CrossExercise.objects.create(
            created_by=user,
            name='Push-ups',
            equipment= EquipmentChoices.BODYWEIGHT,
            rep_max=10
        )
        serializer = CrosExerciseSerializer(exercise)
        data = serializer.data

        self.assertEqual(data['id'], exercise.id)
        self.assertEqual(data['created_by'], user.username)
        self.assertEqual(data['name'], 'Push-ups')
        self.assertEqual(data['equipment'], 'Bodyweight')
        self.assertEqual(data['rep_max'], 10)
        self.assertIn('created_at', data)

    def test_serializer_validation(self):
        data = {'name': '', 'equipment': 'Invalid choice'}
        serializer = CrosExerciseSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertIn('equipment', serializer.errors)
        self.assertIn("This field may not be blank.", serializer.errors['name'][0])
        self.assertIn('"Invalid choice" is not a valid choice.', serializer.errors['equipment'][0])



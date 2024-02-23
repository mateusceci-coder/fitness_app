import factory
from django.contrib.auth.models import User
from authentication.models import Profile
from bodybuilder.models.body_exercise import BodyExercise
from bodybuilder.models.body_workout import WorkoutExercise, BodyWorkout

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'user{n}')
    password = factory.PostGenerationMethodCall('set_password', 'defaultpassword!@#$123')

class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Profile

    user = factory.SubFactory(UserFactory)
    birthday = factory.Faker('date_of_birth')
    height = factory.Faker('pyfloat', positive=True)
    weight = factory.Faker('pyfloat', positive=True)
    gender = factory.Iterator(['Male', 'Female', 'Other'])

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        user = kwargs.get('user', None)
        profile, created = Profile.objects.get_or_create(user=user, defaults=kwargs)
        return profile

class BodyExerciseFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = BodyExercise
    name = factory.Faker('word')
    equipment = factory.Iterator(['Dumbbell', 'Barbell', 'Machine', 'Bodyweight', 'Other'])
    rep_max = factory.Faker('pyfloat', positive=True)
    created_by = factory.SubFactory(UserFactory)

class WorkoutExerciseFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = WorkoutExercise

    workout = factory.SubFactory('factories.BodyWorkoutFactory')
    exercise = factory.SubFactory('factories.BodyExerciseFactory')
    series = factory.Faker('pyint')
    repetitions = factory.Faker('pyint')


class BodyWorkoutFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = BodyWorkout

    name = factory.Faker('word')
    created_by = factory.SubFactory(UserFactory)

    @factory.post_generation
    def exercises(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            # A list of exercises were passed in, use them
            for exercise in extracted:
                self.exercises.add(exercise)
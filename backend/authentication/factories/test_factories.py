import factory
from django.contrib.auth.models import User
from authentication.models import Profile

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'user{n}')
    password = factory.PostGenerationMethodCall('set_password', 'defaultpassword')

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

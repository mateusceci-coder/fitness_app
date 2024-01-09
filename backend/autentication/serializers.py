from rest_framework import serializers
from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer
from .models import Profile

class CustomUserCreateSerializer(UserCreateSerializer):
    """
        Add first_name and last_name fields to the UserCreateSerializer.
    """
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    class Meta(UserCreateSerializer.Meta):
        fields = tuple(UserCreateSerializer.Meta.fields) + ('first_name', 'last_name',)

class UserSerializer(serializers.ModelSerializer):
    """
        Add date_joined field to the UserSerializer.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']

class ProfileSerializer(serializers.ModelSerializer):
    """
        Add all fields to the ProfileSerializer.
    """
    class Meta:
        model = Profile
        fields = ['id', 'user', 'birthday', 'height', 'weight', 'profile_picture']

        extra_kwargs = {
            'profile_picture': {
                'required': False,
                'allow_null': True
            }
        }

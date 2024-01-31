import datetime
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
    birthday = serializers.DateField(required=True)
    height = serializers.FloatField(min_value=0, max_value=300, required=False)
    weight = serializers.FloatField(min_value=0, max_value=300, required=False)
    gender = serializers.ChoiceField(choices=['Male', 'Female', 'Other'])

    def validate_birthday(self, value):
        if value < datetime.date(year=1950, month=1, day=1):
            raise serializers.ValidationError("Birthday cannot be before 1950.")
        elif value > datetime.date.today():
            raise serializers.ValidationError("Birthday cannot be in the future.")
        return value
    
    def validate_height(self, value):
        if value < 140:
            raise serializers.ValidationError("Height cannot be less than 140cm.")
        elif value > 250:
            raise serializers.ValidationError("Height cannot be greater than 250cm.")
            
    class Meta:
        model = Profile
        fields = ['id', 'user', 'birthday', 'height', 'weight', 'profile_picture', 'gender']

        extra_kwargs = {
            'profile_picture': {
                'required': False,
                'allow_null': True
            }
        }

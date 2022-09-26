from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

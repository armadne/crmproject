from rest_framework import serializers
from django.contrib.auth.models import User  # Si tu utilises le modèle User de Django

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

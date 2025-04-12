from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email','password']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'description']



class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()

    def create(self, validated_data):
        # Ensure the password is hashed before saving
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
    
    
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Correct indentation for the following block
        username = data.get('username')
        password = data.get('password')

        # Debugging log to print out data
        print(f"Attempting to authenticate user: {username}")

        user = authenticate(username=username, password=password)
        
        # Debug log: print user details
        if user is None:
            print(f"Authentication failed for username: {username}")
            raise serializers.ValidationError("Invalid credentials")

        # Token generation upon successful authentication
        refresh = RefreshToken.for_user(user)
        
        return {
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'username': user.username,
            'email': user.email
        }
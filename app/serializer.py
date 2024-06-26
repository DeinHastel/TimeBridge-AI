import email
from os import write
from pyexpat import model
from click import password_option
from rest_framework import serializers
from .models import User,Contraseña,Rol,Conversacion,Compras,Chats
from django.contrib.auth import authenticate


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'
        

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password1', 'password2' )
        extra_kwargs = {"password":{"write_only":True}}
        
    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError('Las contraseñas no coinciden')
        
        password = attrs.get("password1", "")
        if len(password) <8:
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres")
        
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")
        
        return User.objects.create_user(password=password, **validated_data)
    

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Credenciales incorrectas")
        
        
    
    
class ContraseñaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contraseña
        fields = '__all__'
        
class ConversacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversacion
        fields = '__all__'
              
class ComprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compras
        fields = '__all__'
        
class ChatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chats
        fields = '__all__'
        

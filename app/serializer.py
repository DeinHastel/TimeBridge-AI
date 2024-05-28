from rest_framework import serializers
from .models import Usuario,Contraseña,Entrenamiento_Datos,Conversacion,Compras,Chats

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
      
class ContraseñaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contraseña
        fields = '__all__'
        
class EntrenamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrenamiento_Datos
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
        

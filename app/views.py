from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UsuarioSerializer,ContraseñaSerializer,EntrenamientoSerializer,ConversacionSerializer,ComprasSerializer,ChatsSerializer
from .models import Usuario,Contraseña,Entrenamiento_Datos,Conversacion,Compras,Chats
# Create your views here.

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    
class ContraseñaView(viewsets.ModelViewSet):
    serializer_class = ContraseñaSerializer
    queryset = Contraseña.objects.all()
    
class EntrenamientoView(viewsets.ModelViewSet):
    serializer_class = EntrenamientoSerializer
    queryset = Entrenamiento_Datos.objects.all()
    
class ConversacionView(viewsets.ModelViewSet):
    serializer_class = ConversacionSerializer
    queryset = Conversacion.objects.all()
    
class ComprasView(viewsets.ModelViewSet):
    serializer_class = ComprasSerializer
    queryset = Compras.objects.all()
    
class ChatsView(viewsets.ModelViewSet):
    serializer_class = ChatsSerializer
    queryset = Chats.objects.all()
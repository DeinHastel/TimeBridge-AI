from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate
from .ignore import api_key
import openai
from .serializer import UsuarioSerializer,ContraseñaSerializer,RolSerializer,ConversacionSerializer,ComprasSerializer,ChatsSerializer
from .models import Usuario,Contraseña,Rol,Conversacion,Compras,Chats
from django.http import JsonResponse
from .token_generator import generate_token, verify_token
# Create your views here.

openai.api_key = api_key

def login_view(request):
    email = request.POST.get('email')
    password = request.POST.get('contraseña_actual')

    try:
        user = Usuario.objects.get(email=email)
        if user.contraseña_actual == password:
            token, expires_at = generate_token(user)
            return JsonResponse({'token': token, 'expires_at': expires_at})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    
def protected_view(request):
    token = request.headers.get('Authorization')
    user = verify_token(token)
    if user:
        # User is authenticated, proceed with the view
        return JsonResponse({'message': 'Hello, authenticated user!'})
    else:
        return JsonResponse({'error': 'Invalid token'}, status=401)

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    
class ContraseñaView(viewsets.ModelViewSet):
    serializer_class = ContraseñaSerializer
    queryset = Contraseña.objects.all()
    
class RolView(viewsets.ModelViewSet):
    serializer_class = RolSerializer
    queryset = Rol.objects.all()
    
class ConversacionView(viewsets.ViewSet):
    def create(self, request):
        # Obtener los datos del cuerpo de la solicitud POST
        chat_id = request.data.get('chat_id')
        messages = request.data.get('messages', [])
        
        try:
            new_messages = []
            for msg in messages:
                role = msg.get('role')
                content = msg.get('content')
                
                # Crear la instancia de Conversacion
                chat = Chats.objects.get(id_chat=chat_id)
                new_message = Conversacion.objects.create(
                    rol=role,
                    texto=content,
                    id_chat=chat
                )
                new_messages.append(new_message)
            
            # Serializar y devolver la respuesta
            serializer = ConversacionSerializer(new_messages, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Chats.DoesNotExist:
            return Response({'error': 'Chat no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class ComprasView(viewsets.ModelViewSet):
    serializer_class = ComprasSerializer
    queryset = Compras.objects.all()
    
class ChatsView(viewsets.ModelViewSet):
    serializer_class = ChatsSerializer
    queryset = Chats.objects.all()
    def get_queryset(self):
        queryset = super().get_queryset()
        filter_param = self.request.query_params.get('filter', None)
        
        if filter_param:
            queryset = queryset.filter(id_usuario=filter_param) 
        
        return queryset.order_by('-id_chat')
    

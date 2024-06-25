from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate
from .serializer import UsuarioSerializer,ContraseñaSerializer,RolSerializer,ConversacionSerializer,ComprasSerializer,ChatsSerializer
from .models import User,Contraseña,Rol,Conversacion,Compras,Chats
from django.http import JsonResponse
# Create your views here.


class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = User.objects.all()
    
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
    

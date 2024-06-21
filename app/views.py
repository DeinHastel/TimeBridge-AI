from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate
from .serializer import UsuarioSerializer,ContraseñaSerializer,RolSerializer,ConversacionSerializer,ComprasSerializer,ChatsSerializer
from .models import Usuario,Contraseña,Rol,Conversacion,Compras,Chats
# Create your views here.

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    
class ContraseñaView(viewsets.ModelViewSet):
    serializer_class = ContraseñaSerializer
    queryset = Contraseña.objects.all()
    
class RolView(viewsets.ModelViewSet):
    serializer_class = RolSerializer
    queryset = Rol.objects.all()
    
class ConversacionView(viewsets.ModelViewSet):
    serializer_class = ConversacionSerializer
    queryset = Conversacion.objects.all()
    
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
        
        return queryset
    
class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Usuario.objects.get(email=email)
            if user.contraseña_actual == password:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'user_id': user.pk,
                    'email': user.email
                })
            else:
                return Response({"error": "Credenciales Invalidas"}, status=status.HTTP_400_BAD_REQUEST)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no existe"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
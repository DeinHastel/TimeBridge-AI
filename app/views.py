from django.shortcuts import render
from rest_framework import viewsets, status
from .serializer import UsuarioSerializer,ContraseñaSerializer,RolSerializer,ConversacionSerializer,ComprasSerializer,ChatsSerializer
from .models import Usuario,Contraseña,Rol,Conversacion,Compras,Chats
from django.http import JsonResponse
from .token_generator import generate_token, verify_token
# Create your views here.

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
    

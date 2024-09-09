import token
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.authtoken.views import ObtainAuthToken
#Auntenticacion bellow
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from rest_framework.views import APIView

from django.contrib.auth import authenticate
from .serializer import UserLoginSerializer, UsuarioSerializer,ContraseñaSerializer,RolSerializer,ConversacionSerializer,ComprasSerializer,ChatsSerializer
from .models import User,Contraseña,Rol,Conversacion,Compras,Chats
from .serializer import UserRegistrationSerializer
from .functions import create_order, generateAccesToken, capture_order
from app import serializer

# Create your views here.

class CrearOrden(APIView):
    def post(self,request):
        order = create_order("Productos")
        return Response(order, status=status.HTTP_200_OK)
    
class CapturarOrderPaypal(APIView):
    def post(self, request, *args, **kwargs):
        print("====D", request.data)
        try:
            order_id = request.data['orderID']
            response = capture_order(order_id)
            print(response)
            return Response(response, status.HTTP_200_OK)
        except:
            print(error)
            return Response({"error":'error aqui'}, status.HTTP_400_BAD_REQUEST)
        
        
class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['tokens'] = {'refresh':str(token),
                          'access': str(token.access_token)}
        return Response(data, status= status.HTTP_201_CREATED)
    
class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = UsuarioSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['tokens'] = {'refresh':str(token),
                          'access': str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)
    
class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UsuarioSerializer
    
    def get_object(self):
        return self.request.user
    
    
    
    


class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = User.objects.all()
    
class ContraseñaView(viewsets.ModelViewSet):
    serializer_class = ContraseñaSerializer
    queryset = Contraseña.objects.all()
    
class RolView(viewsets.ModelViewSet):
    serializer_class = RolSerializer
    queryset = Rol.objects.all()
    
class ConversacionView(viewsets.ModelViewSet):
    serializer_class = ConversacionSerializer

    def get_queryset(self):
        queryset = Conversacion.objects.all()
        chat_id = self.request.query_params.get('chat_id')  # Obtén el chat_id de los parámetros
        if chat_id:
            queryset = queryset.filter(id_chat=chat_id)  # Filtra por el id_chat
        return queryset


    def create(self, request):
        # Obtener los datos del cuerpo de la solicitud POST
        chat_id = request.data.get('chat_id')
        messages = request.data.get('messages', [])
        
        try:
            new_messages = []
            
            # Asegúrate de que el chat existe
            chat = Chats.objects.get(id_chat=chat_id)
            
            # Procesar los mensajes recibidos
            for msg in messages:
                role = msg.get('role')
                content = msg.get('content')
                
                # Crear la instancia de Conversacion para cada mensaje
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
            return Response({'error': 'Chat no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
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
    

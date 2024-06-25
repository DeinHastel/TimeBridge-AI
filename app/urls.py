from django.urls import path, include
from rest_framework import routers
from .views import UsuarioView,ContraseñaView,RolView,ConversacionView,ComprasView,ChatsView,Login,logout

router = routers.DefaultRouter()
router.register(r'usuario', UsuarioView, 'usuario' )
router.register(r'contraseña', ContraseñaView, 'contraseña' )
router.register(r'Rol', RolView, 'rol' )
router.register(r'conversacion', ConversacionView, 'conversacion' )
router.register(r'compras', ComprasView, 'compras' )
router.register(r'chats', ChatsView, 'chats' )

urlpatterns = [
    path("pagina/v1/", include(router.urls)),
    path('api-token-auth/', Login.as_view(), name='api_token_auth'),
    path('api-logout/', logout, name='api_logout'),
] 
from django.urls import path, include
from rest_framework import routers
from .views import UsuarioView,ContraseñaView,RolView,ConversacionView,ComprasView,ChatsView
from .views import UserRegistrationAPIView, UserLoginAPIView, UserLogoutAPIView, UserInfoAPIView, CrearOrden, CapturarOrderPaypal, UpdateUserRole
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'usuario', UsuarioView, 'usuario' )
router.register(r'contraseña', ContraseñaView, 'contraseña' )
router.register(r'Rol', RolView, 'rol' )
router.register(r'conversacion', ConversacionView, 'conversacion' )
router.register(r'compras', ComprasView, 'compras' )
router.register(r'chats', ChatsView, 'chats' )

urlpatterns = [
    path("pagina/v1/", include(router.urls)),
    path("pagina/v1/registro/", UserRegistrationAPIView.as_view(), name='registro'),
    path("pagina/v1/login/", UserLoginAPIView.as_view(), name='login'),
    path("pagina/v1/logout/", UserLogoutAPIView.as_view(), name='logout'),
    path("pagina/v1/token/refresh/", TokenRefreshView.as_view(), name='token-refresh'),
    path("pagina/v1/userinfo/", UserInfoAPIView.as_view(), name='User_info'),
    path("update-role/<int:user_id>/", UpdateUserRole.as_view(), name='update-role'),
    path("api/orders/", CrearOrden.as_view(),),
    path("api/orders/capture/", CapturarOrderPaypal.as_view(),),
    
] 
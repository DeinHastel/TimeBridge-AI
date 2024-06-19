from django.contrib import admin
from .models import Usuario,Contraseña,Rol,Conversacion,Compras,Chats

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Contraseña)
admin.site.register(Rol)
admin.site.register(Conversacion)
admin.site.register(Compras)
admin.site.register(Chats)
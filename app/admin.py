from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Contraseña,Rol,Conversacion,Compras,Chats

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Contraseña)
admin.site.register(Rol)
admin.site.register(Conversacion)
admin.site.register(Compras)
admin.site.register(Chats)
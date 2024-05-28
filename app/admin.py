from django.contrib import admin
from .models import Usuario,Contraseña,Entrenamiento_Datos,Conversacion,Compras,Chats

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Contraseña)
admin.site.register(Entrenamiento_Datos)
admin.site.register(Conversacion)
admin.site.register(Compras)
admin.site.register(Chats)
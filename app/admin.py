from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Contraseña,Rol,Conversacion,Compras,Chats
from .forms import CustomUserChangeForm,CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    
    model = User

# Register your models here.
admin.site.register(Contraseña)
admin.site.register(Rol)
admin.site.register(Conversacion)
admin.site.register(Compras)
admin.site.register(Chats)
from django.db import models
from django.contrib.auth.models import AbstractUser


class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=50)
    class Meta:
        db_table = 'rol'


class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=90)
    rol = models.ForeignKey('Rol', on_delete=models.SET_NULL, null=True, default=1)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self) -> str:
        return self.email


class Contraseña(models.Model):
    id_contraseña = models.AutoField(primary_key=True)
    contraseña = models.CharField(max_length=30)
    fecha_actualizacion = models.DateTimeField(auto_now_add=True)
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        db_table = 'contraseña'

        
class Chats(models.Model):
    id_chat = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=50)
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'chats' 

class Conversacion(models.Model):
    id_conversacion = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=10)
    texto = models.TextField()
    id_chat = models.ForeignKey(Chats, on_delete=models.CASCADE)
    fecha_conversacion = models.DateTimeField(auto_now_add=True)
    adjunto = models.FileField(upload_to='adjuntos/')
    class Meta:
        db_table = 'conversacion'   


class Compras(models.Model):
    id_compra = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    metodo_pago = models.CharField(max_length=100)
    pago = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    estado_compra = models.CharField(max_length=100)
    class Meta:
        db_table = 'compras'
        
        

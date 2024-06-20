from django.db import models

class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=50)
    class Meta:
        db_table = 'rol'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=150)
    email = models.EmailField(unique=True, max_length=150)
    contraseña_actual = models.CharField(max_length=150)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, default=1)
    class Meta:
        db_table = 'usuario'

class Contraseña(models.Model):
    id_contraseña = models.AutoField(primary_key=True)
    contraseña = models.CharField(max_length=150)
    fecha_actualizacion = models.DateTimeField(auto_now_add=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    class Meta:
        db_table = 'contraseña'

        
class Chats(models.Model):
    id_chat = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=150)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'chats' 

class Conversacion(models.Model):
    id_conversacion = models.AutoField(primary_key=True)
    texto = models.TextField()
    id_chat = models.ForeignKey(Chats, on_delete=models.CASCADE)
    fecha_conversacion = models.DateTimeField(auto_now_add=True)
    adjunto = models.FileField(upload_to='adjuntos/')
    class Meta:
        db_table = 'conversacion'   


class Compras(models.Model):
    id_compra = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    metodo_pago = models.CharField(max_length=150)
    pago = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    estado_compra = models.CharField(max_length=150)
    class Meta:
        db_table = 'compras'
        
        

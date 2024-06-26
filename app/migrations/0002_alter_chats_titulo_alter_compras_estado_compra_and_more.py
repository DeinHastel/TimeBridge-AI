# Generated by Django 5.0.1 on 2024-06-26 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chats',
            name='titulo',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='compras',
            name='estado_compra',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='compras',
            name='metodo_pago',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='contraseña',
            name='contraseña',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=90, unique=True),
        ),
    ]

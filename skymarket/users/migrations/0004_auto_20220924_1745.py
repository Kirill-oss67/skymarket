# Generated by Django 3.2.6 on 2022-09-24 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(default='first_name', help_text='Введите имя(максимум 50 символов)', max_length=50, verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(default='last_name', help_text='Введите фамилию(максимум 50 символов)', max_length=50, verbose_name='Фамилия'),
        ),
    ]

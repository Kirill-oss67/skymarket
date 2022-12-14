# Generated by Django 3.2.6 on 2022-09-24 14:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ads', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ad',
            options={'ordering': ('-created_at',), 'verbose_name': 'Объявление', 'verbose_name_plural': 'Объявления'},
        ),
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ('-created_at',), 'verbose_name': 'Комментарий', 'verbose_name_plural': 'Комментарии'},
        ),
        migrations.AddField(
            model_name='ad',
            name='author',
            field=models.ForeignKey(help_text='Введите автора объявления', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ads', to=settings.AUTH_USER_MODEL, verbose_name='Автор объявления'),
        ),
        migrations.AddField(
            model_name='ad',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, help_text='Выберите время создания объявления', null=True, verbose_name='Время создания объявления'),
        ),
        migrations.AddField(
            model_name='ad',
            name='description',
            field=models.CharField(blank=True, help_text='Введите описание товара', max_length=1000, null=True, verbose_name='Описание товара'),
        ),
        migrations.AddField(
            model_name='ad',
            name='image',
            field=models.ImageField(blank=True, help_text='Разместите фото для объявления', null=True, upload_to='images/', verbose_name='Фото'),
        ),
        migrations.AddField(
            model_name='ad',
            name='price',
            field=models.PositiveIntegerField(help_text='Укажите цену на товар', null=True, verbose_name='Цена'),
        ),
        migrations.AddField(
            model_name='ad',
            name='title',
            field=models.CharField(help_text='Введите название товара', max_length=100, null=True, verbose_name='Название товара'),
        ),
        migrations.AddField(
            model_name='comment',
            name='ad',
            field=models.ForeignKey(help_text='Объявление, к которому относится комментарий', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='ads.ad', verbose_name='Объявление'),
        ),
        migrations.AddField(
            model_name='comment',
            name='author',
            field=models.ForeignKey(help_text='Введите автора комментария', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL, verbose_name='Автор комментария'),
        ),
        migrations.AddField(
            model_name='comment',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, help_text='Выберите время создания комментария', null=True, verbose_name='Время создания комментария'),
        ),
        migrations.AddField(
            model_name='comment',
            name='text',
            field=models.CharField(help_text='Оставьте свой комментарий', max_length=1000, null=True, verbose_name='текст комментария'),
        ),
    ]

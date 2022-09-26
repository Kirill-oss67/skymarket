from django.db import models
from django.contrib.auth.models import BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser

from .managers import UserManager


class User(AbstractBaseUser):
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone', "role"]
    ADMIN = 'admin'
    USER = 'user'
    ROLES = [
        (ADMIN, ADMIN),
        (USER, USER)
    ]
    email = models.CharField(max_length=100, default="email_address", unique=True,
                             help_text="Введите электронную почту")
    phone = PhoneNumberField(verbose_name="Номер телефона",
                             help_text="Укажите номер телефона",
                             null=True, blank=True)

    role = models.CharField(max_length=5, choices=ROLES, default=USER, verbose_name="Роль пользователя",
                            help_text="Укажите роль")
    first_name = models.CharField(max_length=50,
                                  verbose_name="Имя",
                                  help_text="Введите имя(максимум 50 символов)",
                                  default="first_name")
    last_name = models.CharField(max_length=50,
                                 verbose_name="Фамилия",
                                 help_text="Введите фамилию(максимум 50 символов)",
                                 default="last_name")
    is_active = models.BooleanField(default=False, verbose_name="Аккаунт активен",
                                    help_text="Укажите активен ли аккаунт")
    image = models.ImageField(upload_to='users_avatars/', null=True, blank=True,
                              verbose_name="Аватарка", help_text="Выбери свой аватар")

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    @property
    def is_admin(self):
        return self.role == User.ADMIN

    @property
    def is_user(self):
        return self.role == User.USER

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    def __str__(self):
        return self.email

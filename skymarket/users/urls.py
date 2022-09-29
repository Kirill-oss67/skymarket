from django.urls import include, path
from djoser.views import UserViewSet
from rest_framework.routers import SimpleRouter

users_router = SimpleRouter()

users_router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path("", include(users_router.urls)),
]
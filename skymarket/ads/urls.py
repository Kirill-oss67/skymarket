from django.urls import include, path
from rest_framework import routers

from .views import AdViewSet, CommentViewSet

ads_router = routers.SimpleRouter()
ads_router.register(r"ads", AdViewSet)
ads_router.register("ads", AdViewSet, basename="users")

comments_router = routers.SimpleRouter()
comments_router.register(r"comments", CommentViewSet, basename="comments")


urlpatterns = [
    path("", include(ads_router.urls)),
    path("", include(comments_router.urls)),

]

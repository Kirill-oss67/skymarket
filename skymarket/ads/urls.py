from django.urls import include, path
from rest_framework import routers

from ads.views import AdViewSet, CommentViewSet

ads_router = routers.SimpleRouter()
ads_router.register('ads', AdViewSet)

comments_router = routers.SimpleRouter()
comments_router.register('comments', CommentViewSet, basename='comments')

urlpatterns = [
    path("", include(ads_router.urls)),
    path("", include(comments_router.urls)),
]

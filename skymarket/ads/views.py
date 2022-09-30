from rest_framework import pagination
from rest_framework.decorators import action

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Ad, Comment
from .permissions import UserPermission
from .serializers import AdSerializer, AdDetailSerializer, CommentSerializer, \
    AdCreateSerializer, CommentListSerializer, \
    CommentCreateSerializer


class AdPagination(pagination.PageNumberPagination):
    page_size = 4


class AdViewSet(ModelViewSet):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

    serializer_action_classes = {
        'list': AdSerializer,
        'retrieve': AdDetailSerializer,
        'create': AdCreateSerializer,
        'update': AdCreateSerializer,
    }
    permission_classes = (UserPermission,)

    @action(detail=False, methods=['get'], url_path=r'me', serializer_class=AdSerializer)
    def user_ads(self, request, *args, **kwargs):
        current_user = self.request.user
        user_ads = Ad.objects.filter(author=current_user)
        page = self.paginate_queryset(user_ads)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset=Ad.objects.all(), many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()


class CommentViewSet(ModelViewSet):
    serializer_class = CommentListSerializer
    serializer_action_classes = {
        'list': CommentListSerializer,
        'retrieve': CommentListSerializer,
        'create': CommentCreateSerializer,
        'update': CommentCreateSerializer,
    }

    permission_classes = (UserPermission,)

    def get_queryset(self):
        return Comment.objects.filter(ad_id=self.kwargs['ad_id'])

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

    def perform_create(self, serializer):
        ad = Ad.objects.get(pk=self.kwargs['ad_id'])
        serializer.save(author=self.request.user, ad=ad)

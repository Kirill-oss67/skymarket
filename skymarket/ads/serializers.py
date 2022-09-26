from phonenumber_field import serializerfields
from rest_framework import serializers

from .models import Comment, Ad


class CommentSerializer(serializers.ModelSerializer):
    author_id = serializers.ReadOnlyField(source="author.id")
    ad_id = serializers.ReadOnlyField(source="ad.id")
    author_first_name = serializers.ReadOnlyField(source="author.first_name")
    author_last_name = serializers.ReadOnlyField(source="author.last_name")

    class Meta:
        model = Comment
        fields = ("pk", "text", "created_ad", "author_id", "ad_id", "author_first_name", "author_last_name")


class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ("pk", "image", "title", "price", "description")


class AdDetailSerializer(serializers.ModelSerializer):
    author_first_name = serializers.ReadOnlyField(source="author.first_name")
    author_last_name = serializers.ReadOnlyField(source="author.last_name")
    author_id = serializers.ReadOnlyField(source="author.id")
    phone = serializerfields.PhoneNumberField(source="author.number", read_only=True)

    class Meta:
        model = Ad
        fields = ("pk", "image", "title", "price", "phone", "author_first_name", "author_last_name",
                  "description", "author_id")

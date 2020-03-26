from rest_framework import serializers

from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ("photo_id", "width", "height", "src")


class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ("height", "width")

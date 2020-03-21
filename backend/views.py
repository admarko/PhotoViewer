from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializer, status

from .models import Photo
from .serializers import PhotoSerializer


@api_view(["GET"])
def photos_list(request):
    if request.method == "GET":
        photos = Photo.objects.all()
        serialized_photos = PhotoSerializer(
            photos, context={"reqest": request}, many=True
        )
        return Response(serialized_photos.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def photo(request, photo_id):
    try:
        photo = Photo.objects.get(photo_id=photo_id)
        serialized_photo = PhotoSerializer(photo, context={"reqest": request})
        return Response(serialized_photo.data)

    except Photo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

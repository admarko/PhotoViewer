from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Photo
from .paginators import PaginationHandlerMixin
from .serializers import PhotoSerializer


class BasicPagination(PageNumberPagination):
    page_size_query_param = "pageSize"


# DEPRICATED:
# @api_view(["GET"])
# def photos_list(request):
#     if request.method == "GET":
#         photos = Photo.objects.all()
#         serialized_photos = PhotoSerializer(
#             photos, context={"reqest": request}, many=True
#         )
#         pagination_class = BasicPagination


#         return Response(serialized_photos.data)
#     else:
#         return Response(status=status.HTTP_400_BAD_REQUEST)


class PhotosList(APIView, PaginationHandlerMixin):
    serializer_class = PhotoSerializer
    pagination_class = BasicPagination

    def get(self, request, *args, **kwargs):
        photos = Photo.objects.all()
        page = self.paginate_queryset(photos)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(photos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def photo(request, photo_id):
    try:
        photo = Photo.objects.get(photo_id=photo_id)
        serialized_photo = PhotoSerializer(photo, context={"reqest": request})
        return Response(serialized_photo.data)

    except Photo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

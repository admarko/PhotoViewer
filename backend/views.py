from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Photo
from .paginators import PaginationHandlerMixin
from .serializers import DimensionSerializer, PhotoSerializer


class BasicPagination(PageNumberPagination):
    page_size_query_param = "pageSize"


class PhotosList(APIView, PaginationHandlerMixin):
    serializer_class = PhotoSerializer
    pagination_class = BasicPagination

    def get_queryset(self):
        queryset = Photo.objects.all()
        height = self.request.query_params.get("height", None)
        width = self.request.query_params.get("width", None)
        if height is not None and width is not None:
            queryset = queryset.filter(width=width).filter(height=height)
        return queryset

    def get(self, request, *args, **kwargs):
        photos = self.get_queryset()
        page = self.paginate_queryset(photos)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(photos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def photo_dimensions(request):
    try:
        dimensions = Photo.objects.order_by().values("height", "width").distinct()
        serialized_dimensions = DimensionSerializer(
            dimensions, context={"request": request}, many=True
        )
        return Response(serialized_dimensions.data)
    except Photo.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

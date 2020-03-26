from django.urls import path

from . import views
from .views import PhotosList

urlpatterns = [
    path("api/photos", PhotosList.as_view(), name="photos"),
    path("api/photos/dimensions", views.photo_dimensions, name="photo-dimensions"),
]

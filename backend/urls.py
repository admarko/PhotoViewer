from django.urls import path

from . import views

urlpatterns = [
    path("api/photos", views.photos_list, name="photos-list"),
    path("api/photos/<int:photo_id>", views.photo, name="photo-detail"),
]

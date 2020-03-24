from django.urls import path

from . import views
from .views import PhotosList

urlpatterns = [
    # path("api/photos", views.photos_list, name="photos-list"), # depricated
    path("api/photos", PhotosList.as_view()),
    path("api/photos/<int:photo_id>", views.photo, name="photo-detail"),
]

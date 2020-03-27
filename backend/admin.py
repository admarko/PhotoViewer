from django.contrib import admin

from .models import Photo


class PhotoAdmin(admin.ModelAdmin):
    def has_change_permission(self, request, obj=None):
        return False

    list_display = ("photo_id", "height", "width", "src")
    search_fields = ("photo_id", "src")
    list_filter = ["height", "width"]


admin.site.register(Photo, PhotoAdmin)

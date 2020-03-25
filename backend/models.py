from django.db import models


class Photo(models.Model):
    photo_id = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    url = models.CharField(max_length=128)

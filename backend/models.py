from django.db import models


class Photo(models.Model):
    photo_id = models.IntegerField()
    height = models.IntegerField()
    width = models.IntegerField()
    url = models.CharField(max_length=128)

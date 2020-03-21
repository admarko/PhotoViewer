# Generated by Django 3.0.4 on 2020-03-21 02:35

from django.db import migrations
import csv
import urllib.parse as urlparse


class Migration(migrations.Migration):
    def create_data(apps, schema_editor):
        Photo = apps.get_model("backend", "Photo")

        with open("./backend/photo_urls.csv") as photo_urls:
            reader = csv.reader(photo_urls)

            for row in reader:
                url = row[0]
                parsed = urlparse.urlparse(url.rstrip())
                args = parsed.path.split("/")[2:]
                photo = Photo(
                    photo_id=int(args[0]),
                    height=int(args[1]),
                    width=int(args[2]),
                    url=url,
                )
                photo.save()

    dependencies = [("backend", "0001_initial")]

    operations = [migrations.RunPython(create_data)]
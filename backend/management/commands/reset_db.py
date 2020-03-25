import csv
import urllib.parse as urlparse

from django.core.management.base import BaseCommand

from backend.models import Photo


class Command(BaseCommand):
    help = "Reset DB by pulling from csv"

    def add_arguments(self, parser):
        parser.add_argument("csv", type=str, help="csv to be parsed")

    def handle(self, *args, **kwargs):
        csv_file = kwargs["csv"]
        Photo.objects.all().delete()

        with open("./backend/" + csv_file) as photo_urls:
            reader = csv.reader(photo_urls)

            for row in reader:
                url = row[0]
                parsed = urlparse.urlparse(url.rstrip())
                args = parsed.path.split("/")[2:]
                photo = Photo(
                    photo_id=int(args[0]),
                    width=int(args[1]),
                    height=int(args[2]),
                    src=url,
                )
                photo.save()

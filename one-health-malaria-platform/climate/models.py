from django.db import models


class ClimateData(models.Model):
    location = models.CharField(max_length=100)
    temperature = models.FloatField()
    humidity = models.FloatField()
    rainfall = models.FloatField()
    wind_speed = models.FloatField()
    recorded_at = models.DateTimeField()

    def __str__(self):
        return f"{self.location} | {self.recorded_at.strftime('%Y-%m-%d %H:%M')}"

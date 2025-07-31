from django.db import models


# 🧍‍♂️ Human Health Indicators
class HumanHealthIndicator(models.Model):
    location = models.CharField(max_length=100)
    date = models.DateField()
    malaria_incidence = models.FloatField(null=True, blank=True)  # cases/1000
    test_positivity_rate = models.FloatField(null=True, blank=True)  # %
    parasite_prevalence = models.FloatField(null=True, blank=True)  # %
    anemia_prevalence = models.FloatField(null=True, blank=True)  # %
    malaria_mortality_rate = models.FloatField(null=True, blank=True)  # deaths/1000

    def __str__(self):
        return f"{self.location} - {self.date}"


# 🐄 Animal Health Indicators
class AnimalHealthIndicator(models.Model):
    location = models.CharField(max_length=100)
    date = models.DateField()
    livestock_density = models.FloatField(null=True, blank=True)  # animals/km²
    livestock_ownership = models.FloatField(null=True, blank=True)  # %
    itl_coverage = models.FloatField(null=True, blank=True)  # %
    distance_to_livestock = models.FloatField(null=True, blank=True)  # meters
    dominant_livestock_type = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.location} - {self.date}"


# 🌦️ Environmental & Climatic Indicators
class EnvironmentalClimaticIndicator(models.Model):
    location = models.CharField(max_length=100)
    date = models.DateField()
    rainfall = models.FloatField(null=True, blank=True)  # mm
    temperature = models.FloatField(null=True, blank=True)  # °C
    humidity = models.FloatField(null=True, blank=True)  # %
    ndvi = models.FloatField(null=True, blank=True)  # index
    evapotranspiration = models.FloatField(null=True, blank=True)  # mm

    def __str__(self):
        return f"{self.location} - {self.date}"

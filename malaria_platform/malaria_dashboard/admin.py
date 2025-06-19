from django.contrib import admin
from .models import HumanHealthIndicator, AnimalHealthIndicator, EnvironmentalClimaticIndicator

# Register your models here.

admin.site.register(HumanHealthIndicator)
admin.site.register(AnimalHealthIndicator)
admin.site.register(EnvironmentalClimaticIndicator)


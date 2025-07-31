
from django.urls import path
from .views import upload_climate_data

urlpatterns = [
    path('climate-data/', upload_climate_data, name='upload-climate-data'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_data, name='upload_data'),
    path('success/', views.upload_success, name='upload_success'),
]

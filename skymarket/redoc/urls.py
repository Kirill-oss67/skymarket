from django.urls import path
from redoc.views import redoc, redoc_json

urlpatterns = [
    path("", redoc),
    path("json/", redoc_json)
]
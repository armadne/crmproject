from django.urls import path
from .views import reservation_view

urlpatterns = [
    path('reserver/', reservation_view, name='reservation')
]
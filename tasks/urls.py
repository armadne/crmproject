from django.urls import path
from .views import reservation_list, register, api_home


urlpatterns = [
    path('reservations/', reservation_list, name='reservation-list'),
    path('', api_home, name='api-home'),
    path('register/', register, name='register-page')
    
]

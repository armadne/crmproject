from django.urls import path
from .views import reservation_list, register_view, api_home, login_view



# Ajout
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView


urlpatterns = [
    path('reservations/', reservation_list, name='reservation-list'),
    path('', api_home, name='api-home'),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login-user'),
    #path('notation/', notation_view, name='notation'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Ajout
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Ajout
    

]


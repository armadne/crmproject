"""
URL configuration for crmproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    23. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# Fichier qui définit les routes globales/principales du projet Django

from django.contrib import admin
from django.urls import path, include
from tasks.views import api_home

urlpatterns = [
    path('admin/', admin.site.urls), # Route pour l'interface d'administration Django
    path('api/', include('tasks.urls')), # Redirige les requetes API vers ton app
    path('', api_home) # Page d'accueil
]



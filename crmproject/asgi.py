"""
ASGI config for crmproject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

# ASGI  protcole pour gérer requetes web

import os

from django.core.asgi import get_asgi_application

# Définition du fichier de configuration utilisé par Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crmproject.settings')

# On recupère l'application ASGI
application = get_asgi_application()

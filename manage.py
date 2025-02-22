#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""

# Script de gestion du projet Django( lancer serveur Django, executer migrations...)

import os
import sys


def main():
    """Run administrative tasks."""
    
    # Définition du fichier de configuration Django par défault
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crmproject.settings') #ici on peut voir que 'crmproject' est le projet principal
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

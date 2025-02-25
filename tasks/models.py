# Importation base de donnée de django
from django.db import models


from django.contrib.auth.models import AbstractUser

from django.conf import settings # récupére le modèle utilisateur

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return self.email


# Création d'une classe pour la Reservation

class Reservation(models.Model):
    # On relie chaque reservation à un utilisateur
    # Si l'utilisateur est supprimé, toutes ses réservations seront aussi supprimés
    # Relie chaque réservation à un utilisateur (CustomUser défini dans settings)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    
    # On ajoute un champ pour stocker la date de la reservation
    date = models.DateField()
    
    # On ajoute un champ pour stocker l'heure de la reservation
    time = models.TimeField()
    
    guests = models.CharField(max_length=10)
    
    # Ajout qui enregistre automatiquement la date et l'heure
    
    created_at = models.DateTimeField(auto_now_add=True)
    

    
    # Fonction qui permet d'afficher une réservation sous forme de texte
    def __str__(self):
        # Lors de l'affichage de la reservation , sera afficher sous cette forme
        # Reservation de [Nom de l'utilisateur] , la [date] et [heure]
        return f"Reservation de {self.name} le {self.date} à {self.time}"
    
    

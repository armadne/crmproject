# Importation base de donnée de django
from django.db import models

# récupérer le modèle d'utilisateur utilisé dans ton projet Django.
from django.contrib.auth import get_user_model

# Recuperation du modèle de l'utilisateur (User) défini dans Django

User = get_user_model()

# Création d'une classe pour la Reservation

class Reservation(models.Model):
    # On relie chaque reservation à un utilisateur
    # Si l'utilisateur est supprimé, toutes ses réservations seront aussi supprimés
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # On ajoute un champ pour stocker la date de la reservation
    date = models.DateField()
    
    # On ajoute un champ pour stocker l'heure de la reservation
    time = models.TimeField()
    
    # Ajout qui enregistre automatiquement la date et l'heure
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    
    # Fonction qui permet d'afficher une réservation sous forme de texte
    def __str__(self):
        # Lors de l'affichage de la reservation , sera afficher sous cette forme
        # Reservation de [Nom de l'utilisateur] , la [date] et [heure]
        return f"Reservation de {self.user.username} le {self.date} à {self.time}"
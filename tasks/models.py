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
    
    
    class Register(models.Model): # On définit une classe Register qui représente une table dans la base de données.
        name = models.CharField(max_length=50) # Ce champ stocke le prénom de l'utilisateur, avec une limite de 50 caractères.*
        family_name = models.CharField(max_length=50) # Ce champ stocke le nom de famille de l'utilisateur, aussi limité à 50 caractères.
        password = models.CharField(max_length=50) # Ce champ stocke le mot de passe sous forme de texte, avec une limite de 128 caractères. Il doit être haché avant stockage.
        #password_confirm = models.CharField(max_length=50)
        email = models.EmailField(unique=True)
        
        def __str__(self):   # Cette méthode spéciale est utilisée pour définir la représentation textuelle de l'objet.
                    # Elle permet d'afficher une chaîne de caractères contenant le prénom, le nom et l'email de l'utilisateur.
        # Cela est utile, par exemple, lorsqu'on affiche un objet Register dans l'interface d'administration Django.
            return f"{self.first_name} {self.last_name} ({self.email})"
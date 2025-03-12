# Importation base de donnée de django
from django.db import models


#from django.contrib.auth.models import AbstractUser

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.conf import settings # récupére le modèle utilisateur


# Manager pour gérer la création d'utilisateurs
class UserManager(BaseUserManager):
    def create_user(self, email, name, family_name, password=None):
        if not email:
            raise ValueError("L'utilisateur doit avoir une adresse email")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, family_name=family_name)
        
        
        
        if password:
            user.set_password(password)  # Hash le mot de passe correctement

        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, family_name, password):
        user = self.create_user(email, name, family_name, password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user




class User(AbstractBaseUser, PermissionsMixin):
    family_name = models.CharField(max_length=150)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)  # Important pour l'authentification
    is_staff = models.BooleanField(default=False)  # Important pour l'accès à l'admin

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'family_name']

    objects = UserManager()

    def __str__(self):
        return f"{self.name} {self.family_name}"


# Création d'une classe pour la Reservation

class Reservation(models.Model):
    # On relie chaque reservation à un utilisateur
    # Si l'utilisateur est supprimé, toutes ses réservations seront aussi supprimés
    # Relie chaque réservation à un utilisateur (CustomUser défini dans settings)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        null=True, 
        blank=True
    )  #related_name="reservation"
    
    
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
    
    

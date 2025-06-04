from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
#from django.contrib.auth import get_user_model  

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.tokens import default_token_generator
from rest_framework_simplejwt.views import TokenObtainPairView


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Importation du modèle d'utilisateur et de la fonction pour hacher les mots de passe
from django.contrib.auth import get_user_model
#from django.contrib.auth.hashers import make_password

# Importation du modèle de réservation défini dans models.py
from .models import Reservation


#AJOUT
from django.contrib.auth.hashers import make_password

#AJOUT

from rest_framework_simplejwt.tokens import RefreshToken

from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


from django.contrib.auth.backends import ModelBackend


from .serializers import UserSerializer  # Vérifie ton serializer
from rest_framework.response import Response


# Récupération du modèle utilisateur (CustomUser si tu en as un, sinon le modèle User de Django)
User = get_user_model()


def validate_user_email(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email", "")
            
            validate_email(email) # Vérifie si l'email est valide
        
            return JsonResponse({"message": "Adresse email valide" }, status=200)
        
        except ValidationError:
            return JsonResponse({"message": "Adresse email invalide"}, status=400)
        
        except json.JSONDecodeError:
            return JsonResponse({"message": "Format JSON invalide"}, status=400)
        
    return JsonResponse({"message": "Méthode non autorisée"}, status=405)







@api_view(["POST"])  # Désactive la protection CSRF (sinon Django bloque les requêtes POST externes)
# FONCTION INSCRIPTION
def register_view(request):
    
    """
    Cette fonction permet à un utilisateur de s'inscrire en envoyant 
    un username, un email et un mot de passe.
    """
    
    # on vérifie que la méthode HTTP utilisée est bien POST
    if request.method == "POST":
        try:
            # Récupération des données envoyées par l'user (nom, nom de famille , email...) sous forme de JSON
            data = json.loads(request.body)
            
            # Extraction des informations envoyées
            name = data.get("name") # Récupère le champ "name"
            family_name = data.get("family_name")
            email = data.get("email") # Récupère le champ "email"
            password = data.get("password") # Récupère le champ "password"
            
            # Vérification que tous les champs sont bien remplis
            if not name or not family_name or not email or not password:
                return JsonResponse({"message": "Tous les champs sont obligatoires"}, status=400)
            
            # Vérification si le nom ou le nom de famille ou l'email existe deja
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({"message": "Adresse email invalide"}, status=400)
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({"message": "Cet email est déjà utilisé"}, status=400)
            
            #AJOUT
            # Création du nouvel utilisateur avec un password hashé
            user = User.objects.create_user(
                email=email,
                password=password, # Hachage du mot de passe pour plus de sécurité
                name=name,
                family_name=family_name
            )
            
            # réponse en JSON confirmant l'inscription
            return JsonResponse({"message": "Inscription réussie", "user_id": user.id}, status=201)
            
        except json.JSONDecodeError:
            # Gérer le cas où les données envoyées ne sont pas en format JSON valide
            return JsonResponse({"message": "Format JSON invalide"}, status=400)
                 
                 
                 
                 

@api_view(["POST"])  # Désactive la protection CSRF (sinon Django bloque les requetes POST externes)
def login_view(request):
        
        try:
            # Récupération des données envoyées par l'user (nom, nom de famille , email...) sous forme de JSON
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            
        except json.JSONDecodeError:
            return JsonResponse({"message": "Format JSON invalide"}, status=400)
            
            
        # Vérifier que l'email et le mot de passe sont fournis
        if not email or not password:
            return JsonResponse({"message": "Email et mot de passe requis"}, status=400)
        
        
        user = authenticate(request, email=email, password=password)
        if user is None:
            return JsonResponse({"message": "Identifiants invalides"}, status=401)
        
        refresh = RefreshToken.for_user(user)
 
        return JsonResponse({
            "success": True,
            "message": "Connexion réussie",
            "tokens": {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
            }
        }, status=200)
        
                
                #login(request, user) # Authentifie l'utilisateur
                #token = default_token_generator.make_token(user) # Génère un token
                #return JsonResponse({"message": "Connexion réussie"}, status=200)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['email'] = self.user.email  # Ajouter l'email dans la réponse
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return None
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None






@api_view(["GET", "POST"])  # Désactive la protection CSRF (utile si tu testes avec Postman)
@permission_classes([IsAuthenticated]) # Seulement les utilisateurs authentifiés
# FONCTION RESERVATION
def reservation_list(request):
    
    """
    
    Cette fonction permet:
    de voir toutes les réservations GET
    d'ajouter une nouvelle réservation POST
    
    """
    
    if request.method == "GET":
        # Récupérer toutes les réservations
        reservations = list(Reservation.objects.all().values("name", "email", "date", "time", "guests"))
        return JsonResponse({"reservations": reservations}, status=200)

# POUR L'AUTHENTIFICATION, METTRE EN PLACE UN SYTEME AUTH
# ET ENLEVER COMMENTAIRE CI DESSOUS
# Cette ligne ne vas jamais s'executer
    elif request.method == "POST":
            
        try:
            # # Récupération des données envoyées par l'utilisateur en JSON
            data = json.loads(request.body)  # Lire la requête JSON envoyée par le frontend
            
             # Extraction des informations
            name = data.get("name")
            email = data.get("email")
            date = data.get("date")
            time = data.get("time")
            guests = data.get("guests")
            
            # Vérification si l'utilisateur est connecté (sinon, il ne peut pas réserver)
            #if not request.user.is_authenticated:
                #return JsonResponse({"message": "Utilisateur non authentifié"}, status=401)

            #  # Vérification si une réservation existe déjà pour cette date et heure
            if Reservation.objects.filter(name=name , email=email, date=date, time=time, guests=guests).exists():
                return JsonResponse({"message": "Créneau déjà réservé"}, status=400)
            
            # Création de la réservation
            Reservation.objects.create(
               # user=request.user, # On attribue la réservation à l'utilisateur connecté
                name = name,
                email = email,
                date=date,
                time=time,
                guests=guests
            )
            
            # Réponse confirmant la réservation
            return JsonResponse({"message": "Réservation réussie"}, status=201)
            
            
        except json.JSONDecodeError:
            # Gérer le cas ou le JSON envoyé est invalide
            return JsonResponse({"message": "Données JSON invalides"}, status=400)

    # Si la méthode HTTP utilisée n'est ni GET ni POST, on renvoie une erreur
    return JsonResponse({"message": "Méthode non autorisée"}, status=405)

            

         

def api_home(request):
    
    """
    Cette fonction renvoie un simple message de bienvenue 
    quand on accède à l'URL de base de l'API.
    """
    
    return JsonResponse({"message": "API Django est en ligne"})

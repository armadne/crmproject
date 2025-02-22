from django.shortcuts import render
from django.http import JsonResponse
from .models import Reservation

# Create your views here.


def reservation_view(request):
    if request.method == "POST":
        
        if not request.user.is_authentificated:
            return JsonResponse({"message": "Utilisateur non authentifié"}, status=401)
        
        user = request.user # Qui fait la reservation
        date = request.POST.get("date")  
        time = request.POST.get('time')
        
        if Reservation.objects.filter(date=date, time=time).exists():
            return JsonResponse({"message": "Créneau déjà réservé"}, status=400)
        
        # Créer la reservation
        
        Reservation.objects.create(user=user, date=date, time=time)
        
        return JsonResponse({"message": "Reservation réussie"}, status=201)
    
    return JsonResponse({"message": "Méthode non autorisée"}, status=405)


def api_home(request):
    # JsonResponse envoie une réponse au format JSON (lisible par le frontend).
    # api_home est une simple fonction qui renvoie un message JSON, pour tester que l’API fonctionne.
    return JsonResponse({"message": "Bienvenue sur l'API Django"})
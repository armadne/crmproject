from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Reservation

@csrf_exempt  # Désactive la protection CSRF (utile si tu testes avec Postman)
def reservation_list(request):
    if request.method == "GET":
        # Récupérer toutes les réservations
        reservations = Reservation.objects.all().values("user__username", "date", "time")
        return JsonResponse({"reservations": list(reservations)}, status=200)

    elif request.method == "POST":
        if not request.user.is_authenticated:  # Correction de l'erreur
            return JsonResponse({"message": "Utilisateur non authentifié"}, status=401)

        try:
            data = json.loads(request.body)  # Lire la requête JSON envoyée par le frontend
            date = data.get("date")
            time = data.get("time")
            first_name = data.get("first_name")
            last_name = data.get("last_name")

            if Reservation.objects.filter(date=date, time=time).exists():
                return JsonResponse({"message": "Créneau déjà réservé"}, status=400)

            # Créer la réservation
            Reservation.objects.create(user=request.user, first_name=first_name, last_name=last_name, date=date, time=time)
            return JsonResponse({"message": "Réservation réussie"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Données JSON invalides"}, status=400)

    return JsonResponse({"message": "Méthode non autorisée"}, status=405)

def api_home(request):
    return JsonResponse({"message": "Bienvenue sur l'API Django"})

// Importe React et les hooks useState et useEffect pour gérer l'état et les effets de bord
import React, { useState, useEffect } from 'react';  
// Importe Axios pour faire des requêtes HTTP vers l'API Django
import axios from 'axios';  

// Définition du composant Reservations
const Reservations = () => {
    // Déclare un état `reservations` pour stocker les données récupérées depuis l'API
    const [reservations, setReservations] = useState([]); 

    // useEffect : s'exécute une seule fois au montage du composant ([] en second argument)
    useEffect(() => {
        // Envoie une requête GET pour récupérer la liste des réservations depuis Django
        axios.get("http://127.0.0.1:8000/api/reservations/")
            .then(response => {
                console.log(response.data);  // Affiche les données reçues dans la console pour vérifier leur structure
                setReservations(response.data);  // Met à jour l'état avec les réservations reçues
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);  // Affiche une erreur en cas de problème
            });
    }, []);  // Le tableau vide [] signifie que l'effet ne s'exécute qu'une seule fois (au montage du composant)

    return (
        <div>
            {/* Titre de la section */}
            <h2>Liste des Réservations</h2>
            
            {/* Vérifie si la liste des réservations est vide */}
            {reservations.length === 0 ? (
                // Si elle est vide, affiche un message
                <p>Aucune réservation pour le moment.</p>
            ) : (
                // Sinon, affiche la liste des réservations
                <ul>
                    {/* Parcourt toutes les réservations et affiche chaque élément dans une <li> */}
                    {reservations.map((reservation) => (
                        <li key={reservation.id}>  
                            {/* Affiche les informations d'une réservation */}
                            {reservation.client} - {reservation.jour} à {reservation.heure}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Exporte le composant Reservations pour pouvoir l'utiliser dans d'autres fichiers
export default Reservations;

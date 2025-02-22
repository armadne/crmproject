// Importe React et les hooks useState et useEffect pour gérer l'état et les effets de bord
import React, { useState, useEffect } from 'react';  
import axios from 'axios';  

const Reservations = () => {
    // Déclare un état `reservations` pour stocker les données récupérées depuis l'API
    const [reservations, setReservations] = useState([]); 

    // useEffect : s'exécute une seule fois au montage du composant ([] en second argument)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/reservations/")
            .then(response => {
                console.log(response.data);  // Affiche les données reçues dans la console
                setReservations(response.data.reservations || []);  // Vérifie la structure des données
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    }, []);  

    return (
        <div>
            <h2>Liste des Réservations</h2>
            
            {/* Vérifie si la liste des réservations est vide */}
            {reservations.length === 0 ? (
                <p>Aucune réservation pour le moment.</p>
            ) : (
                <ul>
                    {/* Parcourt toutes les réservations et affiche chaque élément */}
                    {reservations.map((reservation, index) => (
                        <li key={index}>
                            {/* Vérifie la présence des données avant d'afficher */}
                            {reservation.user ? reservation.user : "Utilisateur inconnu"} - 
                            {reservation.date} à {reservation.time}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Exporte le composant Reservations
export default Reservations;

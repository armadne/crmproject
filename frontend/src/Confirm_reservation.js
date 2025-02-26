// On importe React et les autres outils nécessaires
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// useLocation = Récupère les données envoyées d'une autre page
// useNavigate = Pour changer de page (redirection de page) et peut envoyer des données

// Création du composant "Confirmation"

const Confirmation = () => {
    const location = useLocation(); // Récupère les infos envoyées par la page précedent (page Reservation.js donc le formulaire)
    const navigate = useNavigate(); // Permet de revenir à la page d'accueil

    // On récupère les données de la réservation 
    const reservationData = location.state?.reservationData;

    // Si on arrive sur cette page sans réservation, on affiche un message d'erreur
    if (!reservationData) {
        return <p>Aucune réservation trouvée.</p>
    }

    return(
        <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Merci {reservationData.name}, votre réservation a bien été prise en compte !</h2>
        
        <p>Voici les détails de votre réservation :</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
            <li><strong>Nom :</strong> {reservationData.name}</li>
            <li><strong>Email :</strong> {reservationData.email}</li>
            <li><strong>Date :</strong> {reservationData.date}</li>
            <li><strong>Heure :</strong> {reservationData.time}</li>
            <li><strong>Nombre de personnes :</strong> {reservationData.people}</li>
        </ul>
        <button onClick={() => navigate("/")} style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
            Retour à l'accueil
        </button>
    </div>
    );
}

// Exportation du composant pour le réutilisé
export default Confirmation;
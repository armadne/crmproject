// Importation React et les outils necessaires

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour changer de page apres avoir confirmer la reservation
import axios from "axios"; // Pour envoyer des données au Backend Django

// Création du composant "Reservations"

const Reservations = () => {
    const navigate = useNavigate(); // Permet de rediriger l'utilisateur vers une autre page après la reservation

    // Création d'un etat (useState) pour stcker les infos que l'utilisateur va entrer dans le formulaire 
    const [formData, setFormData] = useState({
        name: "", // Nom du client
        email: "", // Email du clienyt
        date: "",  // Date de réservation
        time: "",   // Heure de la réservation
        guest: 1   // Nombre de personnes (on met 1 par défaut)
    });

    // Fonction pour mettre à jour les valeurs de FormData quand l'utilisateur écrit dans un champ du formulaire
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Fonction exécutée quand l'utilisateur appuie sur le bouton "Confirmer la réservation"
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        try {
            // Envoie les données du formulaire à notre API Django
             const response = await axios.post("http://127.0.0.1:8000/api/reservations/", formData);
             console.log(response.data) // Affiche la réponse du serveur dans la console (pour debug)

             console.log('Redirection vers la page de confirmation...')

             // Si l'envoi est réussi, on redirige l'utilisateur vers la page de confirmation
             // "Navigate" permet de faire une redirection vers la page /Confirmation
             // "state" permet d'envoyer les infos du fomulaire a la page de confirmation
             // "reservationData" et "FormeData" sont les infos du formualaire a envoyer a la page de confirmation
             //Cette ligne sert donc à aller sur la page /Confirmation en envoyant les données de réservation pour qu'on puisse les afficher
             navigate("/confirmation", { state : {reservationData: formData} });

        } catch (error) {
            console.error("Erreur lors de la réservation :", error);
            alert("Erreur lors de la réservation. Veuillez réessayer. ");
        }
    }


    // Affichage du formulaire de réservation
    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center"}}>
            <h2> Réserver une chambre</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column"}}>
            <input type="text" name="name" placeholder="Votre Nom" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Votre Email" value={formData.email} onChange={handleChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                <input type="number" name="people" min="1" placeholder="Nombre de personnes" value={formData.people} onChange={handleChange} required />
                <button type="submit" style={{ marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                    Confirmer la réservation
                </button>

            </form>
        </div>
    );
};


// On exporte le composant pour pouvoir l'utiliser ailleurs
export default Reservations;
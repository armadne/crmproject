// Importation React et les outils necessaires

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Pour changer de page apres avoir confirmer la reservation
//import axios from "axios"; // Pour envoyer des données au Backend Django

// Création du composant "Reservations"

const Reservations = () => {
    const navigate = useNavigate(); // Permet de rediriger l'utilisateur vers une autre page après la reservation

    // Création d'un etat (useState) pour stcker les infos que l'utilisateur va entrer dans le formulaire 
    // FormData est le formulaire pour RESERVER UNE CHAMBRE
    const [formData, setFormData] = useState({
        
        name: "", // Nom du client
        email: "", // Email du client
        date: "",  // Date de réservation
        time: "",   // Heure de la réservation
        guests: 1   // Nombre de personnes (on met 1 par défaut)
    });

    // Historique des réservations
    const [reservations, setReservations] = useState([]);

    // Charger les réservations précédentes depuis localStorage au démarrage
    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
        setReservations(storedReservations);
    }, []);


    // Fonction pour mettre à jour les valeurs de FormData quand l'utilisateur écrit dans un champ du formulaire
    // A chaque fois que l'user ecrit quelque chose le champ du formulaire se remet a jour 
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };




    // Fonction exécutée quand l'utilisateur appuie sur le bouton "Confirmer la réservation"
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        const token = localStorage.getItem("token")
        console.log("Token récupéré :", token)
        // PROBLEME: ECHEC ENVOIE DES DONNEES DU FORMULAIRE A l'API DJANGO <---- Probleme resolu en remplaçant axios par fetch , 
        // axios et fetch ont la meme fonction, celle d'envoyer des requêtes HTTP au serveur backend Django
    

            // Vérifier si l'utilisateur est connecté
            if (!token) {
                alert("Erreur: Vous devez etre connecter pour réserver")
                navigate("/login") // redirige vers la page login
                return;
            }

   
            
 

            try {
            // Envoie les données du formulaire à notre API Django
             const response = await fetch("http://127.0.0.1:8000/api/reservations/", 
        
                {
                method: "POST",  // modif  GET --> POST
                headers:{

                    // Spécifier qu'on envoie du JSON
                    "Content-Type": "application/json", 

                    // Envoyer le token pour l'authentification
                    // l'utilisateur doit avoir 'lautorisation' en d'autre terme il doit avoir un compte et etre connecter pour faire une reservation
                    "Authorization": `Bearer ${token}` // "Bearer" est une règle obligatoire pour envoyer un token
                },

                body: JSON.stringify(formData) // Convertir formData en JSON

             }); 
            // console.log("FormData envoyé :", formData); // ce message s'affichera dans devtool -> console
            // console.log("Status HTTP : ", response.status); // ce message s'affichera dans devtool -> console
             
             let data = null; // data contient les données retournées par l'API
               
            try {

                data = await response.json(); //ICI on essaie de lire le corps de la requete reçu en en format JSON,  Peut échouer si le contenu n'est pas du JSON

             } 
             // SI la réponse n'est pas au format JSON valide ou est vide, on attrape l'erreur ici
             catch(parseError) {
                console.warn("Réponse non-JSON ou vide :", parseError);

             }

  
            
             if (response.ok) {

                console.log("Réponse API après connexion :", data); // Voir la réponse
               // localStorage.setItem("token", data.token); // 🔥 Enregistrer le token
               // console.log("Token enregistré :", localStorage.getItem("token")); // Vérifier si le token est bien stocké

                console.log("Reservation réussie !");

                // Ajouter la nouvelle réservation à la liste des reservations
                const updatedReservations = [...reservations, formData];

                // Mettre à jour l'état local et le localStorage
                // POUR VOIR LES RESERVATIONS FAITES SUR LA PAGE DE RESERVATIONS (STOCKAGE EN LOACAL)

                setReservations(updatedReservations);
                localStorage.setItem("reservations", JSON.stringify(updatedReservations));

                // Rediriger vers la page de confirmation avec les données
                navigate("/confirmation", {state: {reservationData: formData} });
             } 
             // CI-DESSOUS ERREUR LIER A L'API (API c'est ce qui lie le frontend React JS et le backend Django Python)
             else {
                
             //alert(data?.error || "Erreur lors de la reservation")  
                //console.error("Erreur reservation ", data)
                navigate("/confirmation", {state: { reservationData: formData} });  // AJT DE CETTE LIGNE
                //alert("Erreur de connexion : " + (data.error || "Identifiants invalides"));
             }

            }  // Ci-dessous erreur lié a l'envoie de requêtes HTTP
        catch(error) {
                console.error("Erreur de réseau :", error);  // Affiche l'erreur dans la console de devtool
                alert("Erreur lors de la reservation. Veuillez réessayer.");
            }
        

        };
    



    // Affichage du formulaire de réservation
    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center"}}>
            <h2> Réserver une chambre</h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column"}}>
            <input type="text" name="name" placeholder="Votre Nom" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Votre Email" value={formData.email} onChange={handleChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                <input type="number" name="guests" min="1" placeholder="Nombre de personnes" value={formData.guests} onChange={handleChange} required />
                <button type="submit" style={{ marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                    Confirmer la réservation
                </button>

            </form>

                        {/* Affichage de l'historique des réservations */}
                        <div style={{ marginTop: "20px"}}>
                <h3>Reservations précédentes :</h3>
                {reservations.length === 0 ? (
                    <p> Aucune réservation enregistrée.</p>
                ):(
                   <ul>
                    {reservations.map((res, index) => (
                        <li key={index}>
                            {res.name} - {res.date} à {res.time} ({res.guests} pers.)
                        </li>
                    ))}
                   </ul> 
                )}
            </div>



        </div>
    );
};


// On exporte le composant pour pouvoir l'utiliser ailleurs
export default Reservations;
//import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //Pour changer de page après que le user s'est inscrit


// On définit un composant nommé Register
const Register = () => {
    const navigate = useNavigate(); // Permet de rediriger le utilisateur vers une autre page après l'inscription réussie

    // On crée un état formData pour stocker les valeurs des champs du formulaire
    const [formData, setFormData] = useState({
        family_name: "", // champ pour le nom de famille
        name: "", // champ pour le prénom
        email: "", // champ pour l'email
        password: "" // champ pour le password
    });

    // On crée un état message pour afficher un message aprèes inscription
    const [message, setMessage] =useState("");

    // Fonction qui s'exécute quand l'utilisateur tape dans un champ
    //  Met à jour les champs au fur et à mesure que l'utilisateur tape quelque chose dans les champs.
    const handleChange = (e) => {
            // On met à jour l'état formData en copiant les anciennes valeurs et en modifiant uniquement le champ modifié
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Fonction qui s'exécute quand on clique sur le bouton "S'inscrire"
    //  S'exécute quand tu cliques sur "S'inscrire" pour envoyer les infos au serveur backend django.
    const handleSubmit = async (e) => {
        e.preventDefault();  // Empêche la page de se recharger lors de l'envoi du formulaire

    try {
                    
        // On envoie les données du formulaire au serveur Django
        // "fetch" envoie les données au backend django (http://127.0.0.1:8000)
        const response =await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST", // On utilise la méthode POST pour envoyer les données
            headers: { 
                "Content-Type": "application/json"
             }, // On precise que les données envoyées sont en JSON
        
        body: JSON.stringify(formData) // On convertit les données en texte JSON
        });

        // On récupère la réponse du serveur et on la convertit JSON
        const data = await response.json(); 

        if (response.ok) {
            setMessage("Inscription réussie !"); // Si l'inscription est réussie, on affiche un message de succés
            navigate("/login") // // Rediriger vers la page de connexion après inscription
        }else {
            setMessage(data.error || "Erreur lors de l'inscription"); // Sinon, on affiche un message d'erreur
            
        } 
    
    }catch (error) {
            console.log("Erreur d'inscription :", error);
            setMessage("Une erreur est survenue");
        }

        
    }
    
    return(
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center"}}>
            <h2>Inscription</h2> {/* Titre du formulaire */}

            {message && <p>{message}</p>} {/* Affiche le message d'erreur ou de succés si nécessaire */}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column"}}><br/> {/* Formulaire qui appelle handleSubmit quand on l'envoie */}
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br/>
                <input type="text" name="family_name" placeholder="Family Name" onChange={handleChange} required /><br/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br/>
                <input type="password" name="password" placeholder="Mot de Passe" onChange={handleChange} required /><br/>
                <button type="submit" style={{ marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>S'inscrire</button> {/* Bouton pour valider le formulaire */ }
            </form>
        </div>
    );
};

export default Register; // On importe le composant pour pouvoir l'utiliser ailleurs
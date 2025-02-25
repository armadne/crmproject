import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour changer de page après la connexion

// On définit un composant nommé Login

const Login = () => {
    const navigate = useNavigate();

    // On crée un etat formData pour stocker les valeurs des champs du formulaire
    const [formData, setFormData] =useState({
        email : "", // champ pour l'email
        password: "" // champ pour le password
    });

    // On crée un état message pour afficher un message après connexion
    const [message, setMessage] = useState("");

    //Fonction qui s'éxecute lorsque l'utilisateur ecris dans un champ
    // Met a jour les champs au fur et à mesure que l'utilisateur ecris dans un champ
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }
        // Fonction qui s'execute quand on clique sur le bouton "se connecter"
        // S'exécute quand tu cliques sur " se connecter" pour envoyer les infos au backend django

        // async = Permet de faire plusieurs operation en meme temps 
        // Par exemple dans notre fonction handleSubmit 
        // cette fonction envoie les données au backend django 
        // tout en bloquant le chargement de la page 
        // car si la page se recharge les données du formualaire seront perdus
        const handleSubmit = async (e) => {
            
        // "e" = evenement et l'evenement par default est de recharger la page

        e.preventDefault(); //  // Empeche la page de se recharger lors de l'envoi du formualaire

        // On envoie les données du formulaire au serveur Django
        // "fetch" envoie les données au backend django (http://127.0.0.1:8000)

        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST", // On utilise la méthode POST pour envoyer les données
            headers: { "Content-Type": "application.json"},     // On precise que les données envoyées sont en format JSON 
            body: JSON.stringify(formData), // On convertit les données en texte JSON
        });

        // Apres avoir envoyer les données du formulaire au backend,
        // le backend django va repondre au frontend React
        // On récupere la réponse du serveur et on la convertit en JSON
        const data = await response.json();

        if (response.ok) {
            setMessage("Inscription réussie !"); // Si l'inscription est reussie, on affiche un message de succés
            navigate("/register");
        }else {
            setMessage(data.error || "Erreur lors de l'inscription") // Sinon on affiche un message d'erreur
        }
    };

    return(
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center"}}>
            <h2>Login</h2> {/* titre du formulaire */}

            {message && <p>{message}</p>} {/* Affiche le message d'erreur ou de succés si nécessaire */}

            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
                <input type="text" name="email" placeholder='test12@gmail.com' onChange={handleChange} required /><br/>
                <input type='password' name='password' onChange={handleChange} /><br/>

                <button type='submit' style={{marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer"}}>Se connecter</button>
            </form>
        </div>
    );

};

export default Login; // On importe le composant pour pouvoir l'utiliser ailleurs
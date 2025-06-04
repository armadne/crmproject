// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Importation du contexte

const Login = () => {
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth(); // Utilise 'login' à la place de 'setIsAuthenticated'

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    if (isAuthenticated) {
        navigate("/reservations"); // Redirige immédiatement si déjà connecté
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();


            if (response.status === 200) {
                console.log("Token reçu : ", data.token);
                localStorage.setItem("token", data.token); // Creer un token pour l'utilisateur qui s'est connecter
                console.log("Token stocké :", localStorage.getItem("token")) // AFFICHE LE TOKEN DANS LE TERMINAL
                login(); // Utilise la fonction login pour marquer l'utilisateur comme authentifié
                navigate("/reservations");
            } else {
                setMessage(data.error || "Erreur lors de la connexion");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            setMessage("Erreur de connexion au serveur");
        }

    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>Login</h2>
            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <input type="text" name="email" placeholder="test12@gmail.com" onChange={handleChange} required /><br />
                <input type="password" name="password" onChange={handleChange} /><br />
                <button type="submit" style={{ marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;

import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Supprime le token
        navigate("/login"); // Redirige vers la page de connexion
    }, [logout, navigate]);

    return <h1>Déconnexion en cours...</h1>;
};

export default Logout;

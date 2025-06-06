// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

// Création du fournisseur d'authentification
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // AJT DE CETTE LIGNE 
  const [token, setToken] = useState(localStorage.getItem("token"));



  // Initialisation à partir du localStorage au chargement de l'app
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  
  
  // Fonction pour se connecter
  const login = (receivedToken) => {
    localStorage.setItem("token", receivedToken); // sert à stocker localement le token dans le navigateur (dans le localStorage), après la connexion de l’utilisateur.
    setToken(receivedToken)
    setIsAuthenticated(true);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    localStorage.removeItem("token"); // Supprime le token stocké
    setToken(null);
    setIsAuthenticated(false);
    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);


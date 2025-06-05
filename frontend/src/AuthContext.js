// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

// Création du fournisseur d'authentification
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // AJT DE CETTE LIGNE 
  const [token, setToken] = useState(localStorage.getItem("token"));
  // Fonction pour se connecter
  const login = (receivedToken) => {
    localStorage.setItem("token", receivedToken); // sert à stocker localement le token dans le navigateur (dans le localStorage), après la connexion de l’utilisateur.
    setToken(receivedToken)
    setIsAuthenticated(true);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Supprime le token stocké
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);


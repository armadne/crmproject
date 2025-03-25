// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

// Création du fournisseur d'authentification
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fonction pour se connecter
  const login = () => {
    setIsAuthenticated(true);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Supprime le token stocké
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};

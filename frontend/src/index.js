import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import correct pour React 18
import App from "./App";
import { AuthProvider } from "./AuthContext"; // Assure-toi que le chemin est correct

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Utilisation de createRoot
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

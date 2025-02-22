// Importe React (nécessaire pour créer des composants React)
import React from 'react';

// Importe le composant Reservations depuis le fichier Reservations.js
import Reservations from './Reservations';  

// Définition du composant principal App
function App() {
    return (
        <div className="App">  {/* onteneur principal de l'application */}
            <h1>Mon Application de Réservation</h1>  {/* Titre principal de la page */}

            {/* Intégration du composant Reservations (qui affiche les réservations) */}
            <Reservations />  
        </div>
    );
}

// Exporte le composant App pour qu'il puisse être utilisé dans index.js
export default App;

// Importe React (nécessaire pour créer des composants React)
import React from 'react';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Importe le composant Reservations depuis le fichier Reservations.js
import Reservations from './Reservations';  

// Importation du composant Confirmation de Confirmation.js
import Confirmation from "./Confirm_reservation";



// Définition du composant principal App
function App() {
    return (
        <Router>

            <Routes>

                {/* Page principale avec le formulaire */}
                <Route path="/" element={<Reservations />} />

                {/* Page de confirmation après la réservation */}
                <Route path="/confirmation" element={<Confirmation />} />


            </Routes>

        </Router>
    );
}

// Exporte le composant App pour qu'il puisse être utilisé dans index.js
export default App;

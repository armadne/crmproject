// Importe React (nécessaire pour créer des composants React)
import React from 'react';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Importe le composant Reservations depuis le fichier Reservations.js
import Reservations from './Reservations';  

// Importation du composant Confirmation de Confirmation.js
import Confirmation from "./Confirm_reservation";

// Importation du composant Register de Register.js
import Register from './Register';

// Importation du composant Login de Login.js
import Login from './Login'




// Définition du composant principal App
function App() {
    return (
        <Router>

            <Routes>

                {/* Page principale avec le formulaire */}
                <Route path="/" element={<Register />} />

                <Route path="/login" element={<Login />} />

                {/* Page de confirmation après la réservation */}
                <Route path="/confirmation" element={<Confirmation />} />

                <Route path="/reservations" element={<Reservations/>} />


            </Routes>

        </Router>
    );
}

// Exporte le composant App pour qu'il puisse être utilisé dans index.js
export default App;

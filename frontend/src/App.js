// Importe React (nécessaire pour créer des composants React)
import React from 'react';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Importe le composant Reservations depuis le fichier Reservations.js
import Reservations from './Reservations';  

// Importation du composant Confirmation de Confirmation.js
import Confirmation from "./ConfirmReservation";

// Importation du composant Register de Register.js
import Register from './Register';

// Importation du composant Login de Login.js
import Login from './Login';

import  FeedbackQRPage from  './reviews';

import Navbar from './Navbar';




// Définition du composant principal App
function App() {
    return (
        <Router>

            <Navbar/>

            <Routes>

                {/* Page principale avec le formulaire */}
                <Route path="/" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route path="/reservations" element={<Reservations/>} />

                   {/* Page de confirmation après la réservation */}
                   <Route path="/confirmation" element={<Confirmation />} />

                   <Route path="/reviews" element={<FeedbackQRPage />} />
                


            </Routes>

        </Router>
    );
}

// Exporte le composant App pour qu'il puisse être utilisé dans index.js
export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Reservations from './Reservations';  
import Confirmation from "./ConfirmReservation";
import Register from './Register';
import Login from './Login';
import FeedbackQRPage from './reviews';
import Navbar from './Navbar';
import Logout from './Logout'; // 🔥 Import du composant Logout
import { useAuth } from './AuthContext';

// Protéger les routes réservées aux utilisateurs connectés
const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
    return (
        
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/reservations" element={<ProtectedRoute element={<Reservations />} />} />
                    <Route path="/logout" element={<Logout />} /> {/* 🔥 Nouvelle route logout */}
                    <Route path="/confirmation" element={<ProtectedRoute element={<Confirmation />} />} />
                    <Route path="/reviews" element={<FeedbackQRPage />} />
                </Routes>
            </Router>
        
    );
}

export default App;

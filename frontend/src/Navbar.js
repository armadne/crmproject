import React from 'react';
import { Link } from 'react-router-dom';


// On définit un composant nommé Navbar

const Navbar = () => {
return (
    <nav className="navbar">
        <h1>NavBar</h1>
        <div>
            <Link to="/">Accueil</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Se connecter</Link>
            <Link to="/reviews">Give A Review</Link>
        </div>
    </nav>
)
    }

export default Navbar;
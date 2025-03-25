import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar navbar-dark bg-dark" style={{ marginBottom: "30px" }}>
            <div className="container d-flex justify-content-between align-items-center" style={{ marginLeft: "15px" }}>
                <img src="/logo-site.png" alt="logo" style={{ width: "85px", height: "85px" }} />

                <ul className="navbar-nav d-flex flex-row gap-3">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/reviews">Give A Review</Link>
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/reservations">Book A Room</Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={logout} className="nav-link btn btn-link text-white" style={{ border: "none", background: "none", cursor: "pointer" }}>
                                    Se déconnecter
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/login">Se connecter</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

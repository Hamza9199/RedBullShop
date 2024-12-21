import React from 'react';
import './css/Header.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
    const navigate = useNavigate();

    

    const isAuth = token?.accessToken || '';

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("korisnik");
        navigate('/login');
    }

    if (isAuth) {
        return (
            <header id="main-header">
                <div className="header-container">
                    <h1 className="header-title">RedBull Online Prodavnica</h1>
                    <nav className="header-nav">
                        <ul className="nav-list">
                            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="/korpa" className="nav-link">Korpa</a></li>
                            <li className="nav-item"><a href={`/korisnik/${token.id}`} className="nav-link">Profil</a></li>
                            <li onClick={handleLogout} className="nav-item"><a  className="nav-link">Logout</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
    else {
        return (
            <header id="main-header">
                <div className="header-container">
                    <h1 className="header-title">RedBull Online Prodavnica</h1>
                    <nav className="header-nav">
                        <ul className="nav-list">
                            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                            <li className="nav-item"><a href="/register" className="nav-link">Register</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }

   
};

export default Header;

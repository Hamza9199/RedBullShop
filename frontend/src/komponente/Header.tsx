import React from 'react';
import './css/Header.css';

const Header: React.FC = () => {
    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');

    if (!token || !token.accessToken) {
        throw new Error('No token found');
    }

    return (
        <header id="main-header">
            <div className="header-container">
                <h1 className="header-title">RedBull Online Prodavnica</h1>
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/kontakt" className="nav-link">Contact</a></li>
                        <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                        <li className="nav-item"><a href={`/korisnik/${token.id}`} className="nav-link">Profil</a></li>
                        <li className="nav-item"><a href="/korpa" className="nav-link">Korpa</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

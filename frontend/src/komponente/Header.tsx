import React from 'react';

const Header: React.FC = () => {

    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');

    if (!token || !token.accessToken) {
        throw new Error('No token found');
    }

    return (
        <header>
            <h1>Welcome to RedBull Shop</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/kontakt">Contact</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href={`/korisnik/${token.id}`}>Profil</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

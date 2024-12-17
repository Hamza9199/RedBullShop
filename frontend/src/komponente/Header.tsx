import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Welcome to RedBull Shop</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/kontakt">Contact</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

/**
 * Komponenta Register predstavlja stranicu za registraciju korisnika.
 * 
 * @returns JSX.Element - Stranica za registraciju sa formom za unos korisničkih podataka.
 * 
 * Stanja:
 * - username: string - Korisničko ime.
 * - email: string - Email adresa.
 * - password: string - Lozinka.
 * - error: string - Poruka o grešci prilikom registracije.
 * 
 * Funkcije:
 * - handleSubmit: Asinhrona funkcija za obradu forme za registraciju.
 * 
 * @param event - Event objekat za submit forme.
 * 
 * @throws Greška prilikom registracije korisnika.
 */
const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/server/autentifikacija/registracija', {
                username,
                email,
                password
            });

            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (err) {
            console.error('Error:', err);
            setError('Registracija nije uspjela, provjeri podatke.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field2"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field2"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field2"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-button">Register</button>

                <label className="login-link">
                    Već imaš račun? <a href="/login">Login</a>
                </label>
            </form>
        </div>
    );
};

export default Register;
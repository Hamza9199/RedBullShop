import React, { useState, useContext } from 'react';
import { loginCall } from "../context/authContext/serverCallAuth";
import { AuthContext } from "../context/authContext/AuthContext";
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

/**
 * Komponenta Login omogućava korisnicima da se prijave u aplikaciju.
 * 
 * @returns JSX.Element - Forma za prijavu korisnika.
 * 
 * Stanja:
 * - email: string - Email adresa korisnika.
 * - password: string - Lozinka korisnika.
 * - error: string - Poruka o grešci prilikom prijave.
 * 
 * Funkcije:
 * - handleSubmit: Funkcija za obradu forme prilikom prijave.
 * 
 * @param event - Promjena u input polju za email ili lozinku.
 * 
 * @example
 * <Login />
 */
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            const res = await loginCall({ email, password }, dispatch);
            if (res) {
                navigate('/');
            } else {
                setError('Login neuspješan, provjerite podatke');
            }
        } catch (err) {
            console.log(err);
            setError('Login neuspješan, provjerite podatke');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>
                <button type="submit" className="login-button">
                    Login
                </button>
                <label className="register-link">
                    Nemaš račun? <a href="/register">Registriraj se</a>
                </label>
            </form>
        </div>
    );
};

export default Login;
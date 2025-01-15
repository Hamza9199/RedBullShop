import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import './css/UpdateKorisnika.css';

interface Korisnik {
    username: string;
    email: string;
    password: string;
}

/**
 * Komponenta UpdateKorisnik omogućava ažuriranje korisničkog profila.
 * 
 * @returns JSX.Element - Forma za ažuriranje korisničkog profila.
 * 
 * Stanja:
 * - korisnik: Korisnik - Objekt koji sadrži podatke o korisniku (username, email, password).
 * - loading: boolean - Indikator učitavanja podataka.
 * - error: string | null - Poruka o grešci prilikom učitavanja ili ažuriranja podataka.
 * 
 * Hookovi:
 * - useNavigate - Hook za navigaciju između stranica.
 * - useParams - Hook za dohvaćanje parametara iz URL-a.
 * - useEffect - Hook za izvršavanje sporednih efekata (fetch korisničkih podataka).
 * 
 * Funkcije:
 * - fetchKorisnik: Funkcija za dohvaćanje podataka o korisniku sa servera.
 * - handleChange: Funkcija za postavljanje vrijednosti input polja u stanju korisnik.
 * - handleSubmit: Funkcija za slanje ažuriranih podataka o korisniku na server.
 * 
 * @throws Error - Ako token za autorizaciju nije pronađen u lokalnoj pohrani.
 */
const UpdateKorisnik: React.FC = () => {
    const [korisnik, setKorisnik] = useState<Korisnik>({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');

    if (!token || !token.accessToken) {
        throw new Error('No token found');
    }

    const config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
    };

    useEffect(() => {
        const fetchKorisnik = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/server/korisnici/korisnik/${id}`, config);
                setKorisnik(response.data);
                setLoading(false);
            } catch {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        fetchKorisnik();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setKorisnik(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/server/korisnici/${id}`, korisnik, config);
            navigate(`/korisnik/${id}`);
        } catch {
            setError('Error updating user data');
        }
    };

    if (loading) return <p className="loading" id="loading">Loading...</p>;
    if (error) return <p className="error" id="error">{error}</p>;

    return (
        <div className="update-korisnik-container" id="update-korisnik-container">
            <Header />
            <main className="update-korisnik-main" id="update-korisnik-main">
                <h1 className="update-korisnik-title" id="update-korisnik-title">Update Profil</h1>
                <form className="update-korisnik-form" id="update-korisnik-form" onSubmit={handleSubmit}>
                    <div className="form-group" id="form-group-username">
                        <label htmlFor="username" className="form-label" id="form-label-username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            value={korisnik.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" id="form-group-email">
                        <label htmlFor="email" className="form-label" id="form-label-email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={korisnik.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group" id="form-group-password">
                        <label htmlFor="password" className="form-label" id="form-label-password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={korisnik.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="form-button" id="form-button-submit">Update</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default UpdateKorisnik;
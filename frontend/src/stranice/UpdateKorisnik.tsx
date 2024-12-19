import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';

interface Korisnik {
    username: string;
    email: string;
    password: string;
}

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Header />
            <main>
                <h1>Update Profil</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={korisnik.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={korisnik.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={korisnik.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default UpdateKorisnik;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import { Adresa } from '../komponente/Adresa';
import './css/Profil.css';

interface Korisnik {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

interface Recenzija {
    id: string;
    ocjena: number;
    komentar: string;
    korisnikId: number;
}

interface Narudzba {
    id: string;
    korisnikId: number;
    adresaId: number;
    ukupnaCijena: number;
    statusNarudzbe: string;
    placanjeMetoda: string;
    placanjeStatus: string;
    proizvodi: {
        _id: string;
        naziv: string;
        kolicina: number;
        cijena: number;
    }[];
}

export const Profil: React.FC = () => {
    const [korisnik, setKorisnik] = useState<Korisnik | null>(null);
    const [recenzije, setRecenzije] = useState<Recenzija[]>([]);
    const [narudzbe, setNarudzbe] = useState<Narudzba[]>([]);
    const navigate = useNavigate();

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
                const response = await axios.get(`http://localhost:3000/server/korisnici/korisnik/${token.id}`, config);
                setKorisnik(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const fetchRecenzije = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/server/recenzije`, config);
                setRecenzije(response.data.filter((recenzija: Recenzija) => String(recenzija.korisnikId) === String(token.id)));
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        const fetchNarudzbe = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/server/narudzbe`, config);
                setNarudzbe(response.data.filter((narudzba: Narudzba) => String(narudzba.korisnikId) === String(token.id) && narudzba.statusNarudzbe !== "Otkazano"&& narudzba.statusNarudzbe !== "Isporučeno"));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchKorisnik();
        fetchRecenzije();
        fetchNarudzbe();
    }, [token.id]);

    const handleUpdate = () => {
        navigate(`/update-korisnik/${token.id}`);
    };

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-main">
                {korisnik && (
                    
                    <div className="profile-info">
                        <p><strong>Korisničko ime:</strong> {korisnik.username}</p>
                        <p><strong>Email:</strong> {korisnik.email}</p>
                        <button className="btn-update" onClick={handleUpdate}>Ažuriraj Profil</button>
                        {korisnik.isAdmin && (
                            <button className="btn-dashboard" onClick={() => navigate('/dashboard')}>Dashboard</button>
                        )}
                    </div>
                )}
                <div className='profile-content'>
                <div className="profile-section">
                    <h2 className="section-title">Moje Recenzije</h2>
                    <ul className="reviews-list">
                        {recenzije.map((recenzija) => (
                            <li key={recenzija.id} className="review-item" onClick={() => navigate(`/recenzija/${recenzija.id}`)}>
                                <p><strong>Ocjena:</strong> {recenzija.ocjena}</p>
                                <p><strong>Komentar:</strong> {recenzija.komentar}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="profile-section">
                    <h2 className="section-title">Moje Narudžbe</h2>
                    <ul className="orders-list">
                        {narudzbe.map((narudzba) => (
                            <li key={narudzba.id} className="order-item" onClick={() => navigate(`/narudzba-pregled/${narudzba.id}`)}>
                                <p><strong>Ukupna cijena:</strong> {narudzba.ukupnaCijena} KM</p>
                                <p><strong>Status narudžbe:</strong> {narudzba.statusNarudzbe}</p>
                                <p><strong>Način plaćanja:</strong> {narudzba.placanjeMetoda}</p>
                                <p><strong>Status plaćanja:</strong> {narudzba.placanjeStatus}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="profile-section">
                    <h2 className="section-title">Moja Adresa</h2>
                    <Adresa />
                </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

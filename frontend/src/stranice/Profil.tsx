
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import { Adresa } from '../komponente/Adresa';

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
                setNarudzbe(response.data.filter((narudzba: Narudzba) => String(narudzba.korisnikId) === String(token.id) && narudzba.statusNarudzbe != "Otkazano") );
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchNarudzbe();
        fetchKorisnik();
        fetchRecenzije();
    }, [token.id]);

    const handleUpdate = () => {
        navigate(`/update-korisnik/${token.id}`);
    };

    return (
        <div>
            <Header />
            <main>
                <h1>Profil</h1>
                {korisnik && (
                    <div>
                        <p>Username: {korisnik.username}</p>
                        <p>Email: {korisnik.email}</p>
                        <button onClick={handleUpdate}>Ažuriraj Profil</button>
                        {korisnik.isAdmin && <button onClick={() => navigate('/dashboard')}>Dashboard</button>}
                    </div>
                )}
                <section>
                    <h2>Moje Recenzije</h2>
                    <ul>
                        {recenzije.map((recenzija: Recenzija) => (
                            <li key={recenzija.id} onClick={() => navigate(`/recenzija/${recenzija.id}`)}>
                                <p>Ocjena: {recenzija.ocjena}</p>
                                <p>Komentar: {recenzija.komentar}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Moje Narudžbe</h2>
                    <ul>
                        {narudzbe.map((narudzba: Narudzba) => (
                            <li key={narudzba.id} onClick={() => navigate(`/narudzba-pregled/${narudzba.id}`)}>
                                <p>Ukupna cijena: {narudzba.ukupnaCijena}</p>
                                <p>Status narudžbe: {narudzba.statusNarudzbe}</p>
                                <p>Način plaćanja: {narudzba.placanjeMetoda}</p>
                                <p>Status plaćanja: {narudzba.placanjeStatus}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Moja Adresa</h2>
                    <Adresa />
                </section>
            </main>
            <Footer />
        </div>
    );
};


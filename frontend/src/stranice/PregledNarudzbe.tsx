import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';

interface Narudzba {
    _id: string;
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

const PregledNarudzbe: React.FC = () => {
    const [narudzba, setNarudzba] = useState<Narudzba | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');

    if (!token || !token.accessToken) {
        throw new Error('No token found');
    }

    const config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
    };

    useEffect(() => {
        const fetchNarudzba = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/server/narudzbe/${id}`, config);
                setNarudzba(response.data);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        fetchNarudzba();
    }, [id]);

    const handleUpdate = async () => {
        navigate(`/azuriraj-narudzbu/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.put(`http://localhost:3000/server/narudzbe/${id}/status`, { statusNarudzbe: 'Otkazano' }, config);
            navigate(`/korisnik/${token.id}`);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <h1>Pregled Narudžbe</h1>
                {narudzba && (
                    <div>
                        <p>Ukupna cijena: {narudzba.ukupnaCijena}</p>
                        <p>Status narudžbe: {narudzba.statusNarudzbe}</p>
                        <p>Način plaćanja: {narudzba.placanjeMetoda}</p>
                        <p>Status plaćanja: {narudzba.placanjeStatus}</p>
                        <h2>Proizvodi</h2>
                        <ul>
                            {narudzba.proizvodi.map(proizvod => (
                                <li key={proizvod._id}>
                                    <p>Naziv: {proizvod.naziv}</p>
                                    <p>Količina: {proizvod.kolicina}</p>
                                    <p>Cijena: {proizvod.cijena}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleUpdate}>Ažuriraj Narudžbu</button>
                        <button onClick={handleDelete}>Obriši Narudžbu</button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default PregledNarudzbe;
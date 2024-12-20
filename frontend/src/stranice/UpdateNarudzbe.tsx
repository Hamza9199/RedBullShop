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

const UpdateNarudzbe: React.FC = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (narudzba) {
            setNarudzba({
                ...narudzba,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/server/narudzbe/${id}`, narudzba, config);
            navigate(`/narudzba-pregled/${id}`);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <h1>Ažuriraj Narudžbu</h1>
                {narudzba && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Ukupna cijena:
                            <input type="number" name="ukupnaCijena" value={narudzba.ukupnaCijena} onChange={handleChange} />
                        </label>
                        <label>
                            Status narudžbe:
                            <select name="statusNarudzbe" value={narudzba.statusNarudzbe} onChange={handleChange}>
                                <option value="Na čekanju">Na čekanju</option>
                                <option value="Obrađuje se">Obrađuje se</option>
                                <option value="Isporučeno">Isporučeno</option>
                                <option value="Otkazano">Otkazano</option>
                            </select>
                        </label>
                        <label>
                            Način plaćanja:
                            <select name="placanjeMetoda" value={narudzba.placanjeMetoda} onChange={handleChange}>
                                <option value="Kartica">Kartica</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </label>
                        <label>
                            Status plaćanja:
                            <select name="placanjeStatus" value={narudzba.placanjeStatus} onChange={handleChange}>
                                <option value="Čeka se">Čeka se</option>
                                <option value="Uspješno">Uspješno</option>
                                <option value="Neuspješno">Neuspješno</option>
                            </select>
                        </label>
                        <button type="submit">Ažuriraj</button>
                    </form>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default UpdateNarudzbe;
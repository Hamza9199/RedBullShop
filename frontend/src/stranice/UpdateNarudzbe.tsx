import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import './css/UpdateNarudzbe.css';

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

/**
 * Komponenta za ažuriranje narudžbe.
 * 
 * @returns JSX.Element - Komponenta za ažuriranje narudžbe.
 * 
 * @component
 * 
 * @example
 * <UpdateNarudzbe />
 * 
 * @remarks
 * Ova komponenta omogućava korisnicima da ažuriraju postojeću narudžbu.
 * Koristi React Hook-ove `useState`, `useEffect`, `useParams` i `useNavigate`.
 * 
 * @function
 * @name UpdateNarudzbe
 * 
 * @description
 * Komponenta dohvaća narudžbu sa servera koristeći `axios` i prikazuje formu za ažuriranje.
 * Ako korisnik nije autentificiran, baca grešku.
 * 
 * @typedef {Object} Narudzba
 * @property {number} ukupnaCijena - Ukupna cijena narudžbe.
 * @property {string} statusNarudzbe - Trenutni status narudžbe.
 * @property {string} placanjeMetoda - Metoda plaćanja narudžbe.
 * @property {string} placanjeStatus - Status plaćanja narudžbe.
 * 
 * @hook
 * @name useState
 * @description Hook za upravljanje stanjem narudžbe.
 * 
 * @hook
 * @name useEffect
 * @description Hook za dohvaćanje narudžbe sa servera kada se komponenta montira.
 * 
 * @hook
 * @name useParams
 * @description Hook za dohvaćanje parametara iz URL-a.
 * 
 * @hook
 * @name useNavigate
 * @description Hook za navigaciju između stranica.
 * 
 * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Event koji se aktivira kada korisnik promijeni vrijednost u formi.
 * 
 * @param {React.FormEvent} e - Event koji se aktivira kada korisnik pošalje formu.
 * 
 * @throws {Error} Ako token nije pronađen ili je nevažeći.
 */
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
        <div className="update-narudzbe-container" id="update-narudzbe-container">
            <Header />
            <main className="update-narudzbe-main" id="update-narudzbe-main">
                <h1 className="update-narudzbe-title" id="update-narudzbe-title">Ažuriraj Narudžbu</h1>
                {narudzba && (
                    <form className="update-narudzbe-form" id="update-narudzbe-form" onSubmit={handleSubmit}>
                        <label className="update-narudzbe-label" id="update-narudzbe-label-ukupna-cijena">
                            Ukupna cijena:
                            <p className="update-narudzbe-value" id="update-narudzbe-value-ukupna-cijena">{narudzba.ukupnaCijena} KM</p>
                        </label>
                        <label className="update-narudzbe-label" id="update-narudzbe-label-status-narudzbe">
                            Status narudžbe:
                            <select className="update-narudzbe-select" id="update-narudzbe-select-status-narudzbe" name="statusNarudzbe" value={narudzba.statusNarudzbe} onChange={handleChange}>
                                <option value="Na čekanju">Na čekanju</option>
                                <option value="Obrađuje se">Obrađuje se</option>
                                <option value="Isporučeno">Isporučeno</option>
                                <option value="Otkazano">Otkazano</option>
                            </select>
                        </label>
                        <label className="update-narudzbe-label" id="update-narudzbe-label-placanje-metoda">
                            Način plaćanja:
                            <p className="update-narudzbe-value" id="update-narudzbe-value-placanje-metoda">{narudzba.placanjeMetoda}</p>
                        </label>
                        <label className="update-narudzbe-label" id="update-narudzbe-label-placanje-status">
                            Status plaćanja:
                            <select className="update-narudzbe-select" id="update-narudzbe-select-placanje-status" name="placanjeStatus" value={narudzba.placanjeStatus} onChange={handleChange}>
                                <option value="Čeka se">Čeka se</option>
                                <option value="Uspješno">Uspješno</option>
                                <option value="Neuspješno">Neuspješno</option>
                            </select>
                        </label>
                        <button className="update-narudzbe-button" id="update-narudzbe-button" type="submit">Ažuriraj</button>
                    </form>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default UpdateNarudzbe;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import './css/PregledNarudzbe.css';

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
 * Komponenta PregledNarudzbe prikazuje detalje narudžbe i omogućava korisniku da otkaže narudžbu.
 * 
 * @returns JSX.Element - Stranica sa detaljima narudžbe.
 * 
 * Stanja:
 * - narudzba: Narudzba | null - Detalji narudžbe.
 * 
 * Hookovi:
 * - useParams - Dohvata parametre iz URL-a.
 * - useNavigate - Omogućava navigaciju između stranica.
 * - useEffect - Izvršava funkciju prilikom montiranja komponente.
 * 
 * Funkcije:
 * - fetchNarudzba: Asinhrona funkcija za dohvatanje detalja narudžbe sa servera.
 * - handleDelete: Asinhrona funkcija za otkazivanje narudžbe.
 * 
 * @bacanje {Error} Ako token nije pronađen u lokalnom skladištu.
 */
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


    const handleDelete = async () => {
        try {
            await axios.put(`http://localhost:3000/server/narudzbe/${id}/status`, { statusNarudzbe: 'Otkazano' }, config);
            navigate(`/korisnik/${token.id}`);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="pregled-narudzbe-container" id="pregled-narudzbe-container">
            <Header />
            <main className="pregled-narudzbe-main" id="pregled-narudzbe-main">
                <h1 className="pregled-narudzbe-title" id="pregled-narudzbe-title">Pregled Narudžbe</h1>
                {narudzba && (
                    <div className="narudzba-details" id="narudzba-details">
                        <p className="narudzba-ukupna-cijena" id="narudzba-ukupna-cijena">Ukupna cijena: {narudzba.ukupnaCijena}</p>
                        <p className="narudzba-status" id="narudzba-status">Status narudžbe: {narudzba.statusNarudzbe}</p>
                        <p className="narudzba-placanje-metoda" id="narudzba-placanje-metoda">Način plaćanja: {narudzba.placanjeMetoda}</p>
                        <p className="narudzba-placanje-status" id="narudzba-placanje-status">Status plaćanja: {narudzba.placanjeStatus}</p>
                        <h2 className="narudzba-proizvodi-title" id="narudzba-proizvodi-title">Proizvodi</h2>
                        <ul className="narudzba-proizvodi-list" id="narudzba-proizvodi-list">
                            {narudzba.proizvodi.map(proizvod => (
                                <li key={proizvod._id} className="narudzba-proizvod-item" id={`narudzba-proizvod-item-${proizvod._id}`}>
                                    <p className="proizvod-naziv" id={`proizvod-naziv-${proizvod._id}`}>Naziv: {proizvod.naziv}</p>
                                    <p className="proizvod-kolicina" id={`proizvod-kolicina-${proizvod._id}`}>Količina: {proizvod.kolicina}</p>
                                    <p className="proizvod-cijena" id={`proizvod-cijena-${proizvod._id}`}>Cijena: {proizvod.cijena}</p>
                                </li>
                            ))}
                        </ul>
                        <button className="obrisi-narudzbu-button" id="obrisi-narudzbu-button" onClick={handleDelete}>Obriši Narudžbu</button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default PregledNarudzbe;
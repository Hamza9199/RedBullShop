import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../komponente/Footer';
import Header from '../komponente/Header';
import './css/Narudzba.css';

interface Proizvod {
    proizvodId: number;
    naziv: string;
    cijena: number;
    kolicina: number;
}

interface Korpa {
    proizvodi: Proizvod[];
    ukupnaCijena: number;
}

interface AdresaType {
    id: number;
    ulica: string;
    grad: string;
    postanskiBroj: string;
    drzava: string;
}

/**
 * Komponenta Narudzba predstavlja stranicu za pregled i potvrdu narudžbe.
 * 
 * @returns JSX.Element - Stranica za narudžbu.
 * 
 * @component
 * 
 * @example
 * return <Narudzba />
 * 
 * @remarks
 * Ova komponenta koristi React hookove `useState` i `useEffect` za upravljanje stanjem i efektima.
 * Također koristi `axios` za HTTP zahtjeve prema serveru.
 * 
 * @file /c:/Users/User/Desktop/priv/RedBullShop/frontend/src/stranice/Narudzba.tsx
 * 
 * @typedef {Object} Korpa - Tip za korpu.
 * @typedef {Object} AdresaType - Tip za adresu.
 * 
 * @property {Korpa | null} korpa - Stanje koje čuva podatke o korpi.
 * @property {boolean} isLoading - Stanje koje označava da li se podaci učitavaju.
 * @property {AdresaType | null} adresa - Stanje koje čuva podatke o adresi.
 * @property {string} placanje - Stanje koje čuva odabranu metodu plaćanja.
 * @property {Function} navigate - Funkcija za navigaciju između stranica.
 * @property {Object} token - Token za autentifikaciju korisnika.
 * 
 * @function fetchKorpa - Asinhrona funkcija za dohvaćanje podataka o korpi.
 * @function fetchAdresa - Asinhrona funkcija za dohvaćanje podataka o adresi.
 * @function handleOrderSubmit - Asinhrona funkcija za slanje narudžbe.
 * 
 * @returns {JSX.Element} - JSX element koji prikazuje stranicu za narudžbu.
 */
const Narudzba: React.FC = () => {
    const [korpa, setKorpa] = useState<Korpa | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [adresa, setAdresa] = useState<AdresaType | null>(null);
    const [placanje, setPlacanje] = useState<string>('Kartica');
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('korisnik') || '{}');

    useEffect(() => {
        const fetchKorpa = async () => {
            try {
                if (!token?.id) {
                    console.error('User ID is missing');
                    return;
                }

                const response = await axios.get(
                    'http://localhost:3000/server/korpe',
                    {
                        headers: { Authorization: `Bearer ${token.accessToken}` },
                        params: { id: token.id },
                    }
                );
                setKorpa(response.data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAdresa = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/server/adrese',
                    {
                        headers: { Authorization: `Bearer ${token.accessToken}` },
                    }
                );
                if (response.data.length > 0) {
                    setAdresa(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        fetchKorpa();
        fetchAdresa();
    }, []);

    const handleOrderSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/server/narudzbe',
                {
                    korisnikId: token?.id,
                    adresaId: adresa?.id,
                    ukupnaCijena: korpa?.ukupnaCijena,
                    placanjeMetoda: placanje.toString(),
                    proizvodi: korpa?.proizvodi,
                },
                {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                }
            );
            console.log('Narudzba uspjesna:', response.data);

            await axios.delete(
                'http://localhost:3000/server/korpe',
                {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    data: { id: token.id },
                }
            );

            navigate('/korpa');
        } catch (error) {
            console.error('Greska tokom narudzbe:', error);
        }
    };

    if (isLoading) {
        return <p>Učitavanje...</p>;
    }

    return (
        <>
            <Header />
            <div className="narudzba-container">
                <h1 className="narudzba-title">Narudzba</h1>
                {korpa && korpa.proizvodi.length > 0 ? (
                    <>
                        <ul className="narudzba-list">
                            {korpa.proizvodi.map((proizvod) => (
                                <li className="narudzba-item" key={proizvod.proizvodId}>
                                    <p className="proizvod-naziv">Naziv: {proizvod.naziv}    -</p>
                                    <p className="proizvod-cijena">Cijena: {proizvod.cijena} KM    -</p>
                                    <p className="proizvod-kolicina">Količina: {proizvod.kolicina}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="narudzba-footer">
                            <h2 className="ukupna-cijena">Ukupna Cijena: {korpa.ukupnaCijena} KM</h2>
                            {adresa ? (
                                <div className="adresa-info">
                                    <p>Adresa: {adresa.ulica}, {adresa.grad}, {adresa.postanskiBroj}, {adresa.drzava}</p>
                                </div>
                            ) : (
                                <p className="no-adresa">Nema dostupne adrese.</p>
                            )}
                            <div className="placanje-container">
                                <label htmlFor="placanje-select">Metoda Plaćanja:</label>
                                <select
                                    id="placanje-select"
                                    className="placanje-select"
                                    value={placanje}
                                    onChange={(e) => setPlacanje(e.target.value)}
                                >
                                    <option value="Kartica">Kartica</option>
                                    <option value="PayPal">PayPal</option>
                                    <option value="Pouzećem">Pouzećem</option>
                                </select>
                            </div>
                            <div className="narudzba-container-button">
                            <button
                                className="narudzba-button"
                                onClick={handleOrderSubmit}
                                disabled={!adresa}
                            >
                                Potvrdi Narudzbu
                            </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="korpa-empty">Vaša korpa je prazna.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Narudzba;

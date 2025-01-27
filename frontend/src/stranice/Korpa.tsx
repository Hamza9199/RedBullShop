import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import './css/Korpa.css';

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

/**
 * Komponenta Korpa predstavlja stranicu sa korpom proizvoda.
 * 
 * @returns JSX.Element - Stranica sa korpom proizvoda.
 * 
 * Stanja:
 * - korpa: Korpa | null - Podaci o korpi proizvoda.
 * - isLoading: boolean - Indikator učitavanja podataka.
 * 
 * Funkcije:
 * - fetchKorpa: Asinhrona funkcija za dohvaćanje podataka o korpi sa servera.
 * - handleProceedToOrder: Funkcija za navigaciju na stranicu za narudžbu.
 * 
 * Efekti:
 * - useEffect: Efekat koji se izvršava prilikom montiranja komponente i dohvaća podatke o korpi.
 * 
 * Prikaz:
 * - Ako se podaci učitavaju, prikazuje se poruka "Učitavanje...".
 * - Ako je korpa prazna, prikazuje se poruka "Vaša korpa je prazna.".
 * - Ako korpa sadrži proizvode, prikazuje se lista proizvoda sa nazivom, cijenom i količinom, te ukupna cijena i dugme za narudžbu.
 */
export const Korpa: React.FC = () => {
    const [korpa, setKorpa] = useState<Korpa | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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

        fetchKorpa();
    }, []);

    const handleProceedToOrder = () => {
        navigate('/narudzba');
    };

    if (isLoading) {
        return <p>Učitavanje...</p>;
    }

    return (
        <>
            <Header />
            <div className="korpa-container">
                <h1 className="korpa-title">Vaša Korpa</h1>
                {korpa && korpa.proizvodi.length > 0 ? (
                    <>
                        <ul className="korpa-list">
                            {korpa.proizvodi.map((proizvod) => (
                                <li className="korpa-item" key={proizvod.proizvodId}>
                                    <p className="proizvod-naziv">Naziv:  {proizvod.naziv} - </p>
                                    <p className="proizvod-cijena">Cijena: {proizvod.cijena} KM - </p>
                                    <p className="proizvod-kolicina">Količina: {proizvod.kolicina}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="korpa-footer">
                            <h2 className="ukupna-cijena">Ukupna Cijena: {korpa.ukupnaCijena} KM</h2>
                            <button className="korpa-button" onClick={handleProceedToOrder}>
                                Naruči
                            </button>
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

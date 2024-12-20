import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../komponente/Footer"
import Header from "../komponente/Header"

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
                        params: { id: token.id }
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
                        headers: { Authorization: `Bearer ${token.accessToken}` }
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
                    headers: { Authorization: `Bearer ${token.accessToken}` }
                }
            );
            console.log('Narudzba uspjesna:', response.data);

            // Obrisi korpu
            await axios.delete(
                'http://localhost:3000/server/korpe',
                {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                    data: { id: token.id }
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
        <div>
            <h1>Narudzba</h1>
            {korpa && korpa.proizvodi.length > 0 ? (
                <>
                    <ul>
                        {korpa.proizvodi.map((proizvod) => (
                            <li key={proizvod.proizvodId}>
                                <p>Naziv: {proizvod.naziv}</p>
                                <p>Cijena: {proizvod.cijena} KM</p>
                                <p>Količina: {proizvod.kolicina}</p>
                            </li>
                        ))}
                    </ul>
                    <h2>Ukupna Cijena: {korpa.ukupnaCijena} KM</h2>
                    {adresa ? (
                        <div>
                            <p>Adresa: {adresa.ulica}, {adresa.grad}, {adresa.postanskiBroj}, {adresa.drzava}</p>
                        </div>
                    ) : (
                        <p>Nema dostupne adrese.</p>
                    )}
                    <div>
                        <label>
                            Metoda Plaćanja:
                            <select
                                value={placanje}
                                onChange={(e) => setPlacanje(e.target.value)}
                            >
                                <option value="Kartica">Kartica</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Pouzećem">Pouzećem</option>
                            </select>
                        </label>
                    </div>
                    <button onClick={handleOrderSubmit} disabled={!adresa}>Potvrdi Narudzbu</button>
                </>
            ) : (
                <p>Vaša korpa je prazna.</p>
            )}
        </div>
        <Footer />
        </>
    );
};

export default Narudzba;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Proizvod {
    proizvodId: string;
    kolicina: number;
    cijena: number;
}

interface Korpa {
    korisnikId: string;
    proizvodi: Proizvod[];
    ukupnaCijena: number;
}

export const Korpa: React.FC = () => {
    const [korpa, setKorpa] = useState<Korpa | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchKorpa = async () => {
            try {
                const korisnik = localStorage.getItem("korisnik");
                if (!korisnik) {
                    throw new Error("Korisnik nije pronađen u lokalnom skladištu.");
                }
                const token = JSON.parse(korisnik);
                const response = await axios.get<Korpa>('http://localhost:3000/server/korpe', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setKorpa(response.data);
            } catch (err) {
                console.error(err);
                setError('Došlo je do greške prilikom učitavanja korpe.');
            } finally {
                setLoading(false);
            }
        };

        fetchKorpa();
    }, []);

    if (loading) {
        return <p>Učitavanje...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!korpa || korpa.proizvodi.length === 0) {
        return <p>Vaša korpa je prazna.</p>;
    }

    return (
        <div>
            <h1>Korpa</h1>
            <ul>
                {korpa.proizvodi.map((item) => (
                    <li key={item.proizvodId}>
                        Proizvod ID: {item.proizvodId} - Količina: {item.kolicina} - Cijena: ${item.cijena}
                    </li>
                ))}
            </ul>
            <p>Ukupna cijena: ${korpa.ukupnaCijena}</p>
        </div>
    );
};

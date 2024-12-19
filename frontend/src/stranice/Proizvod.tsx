import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const Proizvod: React.FC = () => {
    interface Proizvod {
        id: number;
        naziv: string;
        opis: string;
        cijena: number;
        slikaURL: string;
    }

    interface Recenzija {
        id: number;
        ocjena: number;
        komentar: string;
        korisnikId: string;
    }

    const [proizvod, setProizvod] = useState<Proizvod | null>(null);
    const [recenzije, setRecenzije] = useState<Recenzija[]>([]);
    const [hasReviewed, setHasReviewed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams();
    const navigate = useNavigate();

    // Dohvati token iz localStorage
    const token = JSON.parse(localStorage.getItem('korisnik') || '{}');
    const userId = token?.id; 
    const config = token?.accessToken
        ? { headers: { Authorization: `Bearer ${token.accessToken}` } }
        : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dohvati proizvod
                const proizvodResponse = await axios.get(`http://localhost:3000/server/proizvodi/${id}`);
                setProizvod(proizvodResponse.data);

                // Dohvati recenzije
                const recenzijeResponse = await axios.get(`http://localhost:3000/server/recenzije/${id}/sve`);
                setRecenzije(recenzijeResponse.data);

                // Provjeri da li korisnik već ima recenziju
                if (userId) {
                    const userReviewExists = recenzijeResponse.data.some(
                        (recenzija: Recenzija) => String(recenzija.korisnikId) === String(userId)
                    );
                    
                    setHasReviewed(userReviewExists);
                }

                const korisnikovaRecenzija = recenzijeResponse.data.find(
                    (recenzija: Recenzija) => String(recenzija.korisnikId) === String(userId)
                );
                
                const ostaleRecenzije = recenzijeResponse.data.filter(
                    (recenzija: Recenzija) => String(recenzija.korisnikId) !== String(userId)
                );
                
                setRecenzije(korisnikovaRecenzija ? [korisnikovaRecenzija, ...ostaleRecenzije] : recenzijeResponse.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, userId]);

    const handleAddToCart = async () => {
        try {
            if (!config) {
                console.error('Authorization token is missing');
                return;
            }

            await axios.post(
                'http://localhost:3000/server/korpe',
                {
                    proizvodi: [{ proizvodId: id, kolicina: 1 }],
                    ukupnaCijena: proizvod ? proizvod.cijena : 0,
                },
                config
            );
            navigate('/korpa');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (isLoading) {
        return <p>Učitavanje...</p>;
    }

    return (
        <div>
            {proizvod && (
                <>
                    <h1>{proizvod.naziv}</h1>
                    <img src={proizvod.slikaURL} alt={proizvod.naziv} />
                    <p>{proizvod.opis}</p>
                    <p>{proizvod.cijena} KM</p>
                    <button onClick={handleAddToCart}>Dodaj u Korpu</button>
                    <h2>Recenzije</h2>
                    {recenzije.length > 0 ? (
                        recenzije.map((recenzija) => (
                            <div
                                key={recenzija.id}
                                onClick={() => navigate(`/recenzija/${recenzija.id}`)}
                            >
                                <p>Ocjena: {recenzija.ocjena}</p>
                                <p>Komentar: {recenzija.komentar}</p>
                            </div>
                        ))
                    ) : (
                        <p>Još uvijek nema recenzija.</p>
                    )}
                    {hasReviewed  ? (
                        <button onClick={() => navigate(`/update-recenzija/${id}`)}>
                            Ažuriraj Recenziju
                        </button>
                    ) : (
                        <button onClick={() => navigate(`/nova-recenzija/${id}`)}>Dodaj Recenziju</button>
                    )}
                </>
            )}
        </div>
    );
};

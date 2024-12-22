import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import './css/Proizvod.css';

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

    const token = JSON.parse(localStorage.getItem('korisnik') || '{}');
    const userId = token?.id; 
    const config = token?.accessToken
        ? { headers: { Authorization: `Bearer ${token.accessToken}` } }
        : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const proizvodResponse = await axios.get(`http://localhost:3000/server/proizvodi/${id}`);
                setProizvod(proizvodResponse.data);

                const recenzijeResponse = await axios.get(`http://localhost:3000/server/recenzije/${id}/sve`, config || undefined);
                setRecenzije(recenzijeResponse.data);

                if (userId) {
                    const userReviewExists = recenzijeResponse.data.some(
                        (recenzija: Recenzija) => String(recenzija.korisnikId) === String(userId)
                    );
                    setHasReviewed(userReviewExists);

                    const korisnikovaRecenzija = recenzijeResponse.data.find(
                        (recenzija: Recenzija) => String(recenzija.korisnikId) === String(userId)
                    );
                    const ostaleRecenzije = recenzijeResponse.data.filter(
                        (recenzija: Recenzija) => String(recenzija.korisnikId) !== String(userId)
                    );
                    setRecenzije(korisnikovaRecenzija ? [korisnikovaRecenzija, ...ostaleRecenzije] : recenzijeResponse.data);
                }
            } catch {
                console.error('Greska prilikom dohvatanja proizvoda ili recenzija.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, userId]);

    const handleAddToCart = async () => {
        try {
            if (!config) {
                console.error('Nedostaje token.');
                return;
            }

            let proizvodi: { proizvodId: number; kolicina: number; naziv?: string; cijena?: number }[] = [];
            try {
                const response = await axios.get(
                    'http://localhost:3000/server/korpe',
                    {
                        headers: { Authorization: `Bearer ${token.accessToken}` },
                        params: { id: token.id }
                    }
                );

                if (response.data) {
                    proizvodi = [...response.data.proizvodi];
                    const existingProduct = proizvodi.find(
                        (product: { proizvodId: number; kolicina: number; naziv?: string; cijena?: number }) => product.proizvodId === Number(id)
                    );

                    if (existingProduct) {
                        existingProduct.kolicina += 1;
                    } else {
                        proizvodi.push({
                            proizvodId: Number(id),
                            kolicina: 1,
                            naziv: proizvod?.naziv,
                            cijena: proizvod?.cijena,
                        });
                    }
                }
            } catch {
                console.warn('Nemate Korpu.');
                proizvodi.push({
                    proizvodId: Number(id),
                    kolicina: 1,
                    naziv: proizvod?.naziv,
                    cijena: proizvod?.cijena,
                });
            }

            await axios.post(
                'http://localhost:3000/server/korpe',
                {
                    korisnikId: parseInt(userId),
                    ukupnaCijena: proizvodi.reduce((total: number, product: { cijena?: number; kolicina: number }) => total + (product.cijena ?? 0) * product.kolicina, 0),
                    proizvodi: proizvodi,
                },
                config
            );
            navigate('/korpa');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    
    if (isLoading) {
        return <p className="loading" id="loading">Učitavanje...</p>;
    }

    const handleGoToCreateReview = () => {
        localStorage.setItem('proizvod', JSON.stringify(proizvod?.id));
        navigate(`/nova-recenzija`);
    };

    const handleGoToUpdateReview = () => {
        const recenzija = recenzije.find((recenzija: Recenzija) => String(recenzija.korisnikId) === String(userId));
        const id = recenzija?.id;
        navigate(`/update-recenzija/${id}`);
    };

    return (
        <>
            <Header />
            <div className="proizvod-container" id="proizvod-container">
                {proizvod && (
                    <>
                        <img src={proizvod.slikaURL} alt={proizvod.naziv} className="proizvod-image" id="proizvod-image" />
                        <div className="proizvod-details">
                            <h1 className="proizvod-title" id="proizvod-title">{proizvod.naziv}</h1>
                            <p className="proizvod-description" id="proizvod-description">{proizvod.opis}</p>
                            <p className="proizvod-price" id="proizvod-price">{proizvod.cijena} KM</p>
                            <button onClick={handleAddToCart} className="proizvod-button" id="proizvod-button">Dodaj u Korpu</button>
                            
                        </div>
                        <div className="recenzije-container" >
                            {recenzije.length > 0 ? (
                                recenzije.map((recenzija) => (
                                    <div
                                        key={recenzija.id}
                                        onClick={() => navigate(`/recenzija/${recenzija.id}`)}
                                        className="recenzija-item"
                                        
                                    >
                                        <p className="recenzija-ocjena2" >Ocjena: {recenzija.ocjena}</p>
                                        <p className="recenzija-komentar2">{recenzija.komentar}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="no-recenzije" id="no-recenzije">Još uvijek nema recenzija.</p>
                            )}
                            {hasReviewed ? (
                                <button onClick={handleGoToUpdateReview} className="recenzija-button" id="recenzija-button-update">
                                    Ažuriraj Recenziju
                                </button>
                            ) : (
                                <button onClick={handleGoToCreateReview} className="recenzija-button" id="recenzija-button-create">Dodaj Recenziju</button>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
    
};

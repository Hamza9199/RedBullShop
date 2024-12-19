import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        
            fetchKorpa();
        }, []);
        
        

    const handleProceedToOrder = () => {
        navigate('/narudzba');
    };

    if (isLoading) {
        return <p>Učitavanje...</p>;
    }

    return (
        <div>
            <h1>Vaša Korpa</h1>
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
                    <button onClick={handleProceedToOrder}>Naruči</button>
                </>
            ) : (
                <p>Vaša korpa je prazna.</p>
            )}
        </div>
    );
};

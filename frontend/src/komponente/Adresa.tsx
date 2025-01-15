import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Komponenta Adresa prikazuje adresu korisnika i omogućava ažuriranje ili kreiranje nove adrese.
 * 
 * @component
 */
export const Adresa = () => {
    interface AdresaType {
        id: number;
        ulica: string;
        grad: string;
        postanskiBroj: string;
        drzava: string;
    }

    const [adresa, setAdresa] = useState<AdresaType | null>(null);
    const history = useNavigate();

    // Dohvati token iz lokalne pohrane
    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');

    if (!token || !token.accessToken) {
        throw new Error('No token found');
    }

    const config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
    };

    useEffect(() => {
        // Funkcija za dohvaćanje adrese
        const fetchAdresa = async () => {
            try {
                const response = await axios.get('http://localhost:3000/server/adrese', config);
                if (response.data.length > 0) {
                    setAdresa(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        fetchAdresa();
    }, []);

    // Funkcija za ažuriranje adrese
    const handleUpdate = () => {
        if (adresa) {
            history(`/update-adresa/${adresa.id}`);
        }
    };

    // Funkcija za kreiranje nove adrese
    const handleCreate = () => {
        if (!adresa) {
            history('/nova-adresa');
        }
    };

    return (
        <div>
            {adresa ? (
                <div>
                    <p>Ulica: {adresa.ulica}</p>
                    <p>Grad: {adresa.grad}</p>
                    <p>Poštanski Broj: {adresa.postanskiBroj}</p>
                    <p>Država: {adresa.drzava}</p>
                    <button onClick={handleUpdate}>Ažuriraj Adresu</button>
                </div>
            ) : (
                <p>Nemate kreiranu adresu.</p>
            )}
            <button onClick={handleCreate} disabled={!!adresa}>Kreiraj Adresu</button>
        </div>
    );
};

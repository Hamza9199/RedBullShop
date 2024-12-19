import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const NoviProizvod = () => {
    const [proizvod, setProizvod] = useState({
        naziv: '',
        opis: '',
        kategorija: '',
        cijena: 0,
        slikaURL: ''
    });
    const { id } = useParams();
    const history = useNavigate();

    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');

    if (!token || !token.accessToken) {
        throw new Error('No token found');
    }

    const config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
    };

    // Fetch funkcija koja koristi token u zaglavljima
    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/server/proizvodi/${id}`, config);
                    setProizvod(response.data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProizvod(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                // Za ažuriranje proizvoda
                await axios.put(`http://localhost:3000/server/proizvodi/${id}`, proizvod, config);
                history('/');
            } else {
                // Za kreiranje novog proizvoda
                await axios.post('http://localhost:3000/server/proizvodi', proizvod, config);
                history('/');
            }
        } catch (error) {
            console.error('Error creating or updating product:', error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Ažuriraj Proizvod' : 'Novi Proizvod'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Naziv:</label>
                    <input
                        type="text"
                        name="naziv"
                        value={proizvod.naziv}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Opis:</label>
                    <input
                        type="text"
                        name="opis"
                        value={proizvod.opis}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Kategorija:</label>
                    <input
                        type="text"
                        name="kategorija"
                        value={proizvod.kategorija}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cijena:</label>
                    <input
                        type="number"
                        name="cijena"
                        value={proizvod.cijena}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Slika URL:</label>
                    <input
                        type="text"
                        name="slikaURL"
                        value={proizvod.slikaURL}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{id ? 'Ažuriraj' : 'Kreiraj'}</button>
            </form>
        </div>
    );
};

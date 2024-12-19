
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const NovaAdresa = () => {
    const [adresa, setAdresa] = useState({
        ulica: '',
        grad: '',
        postanskiBroj: '',
        drzava: ''
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

    useEffect(() => {
        const fetchAdresa = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/server/adrese/${id}`, config);
                    setAdresa(response.data);
                } catch (error) {
                    console.error('Error fetching address:', error);
                }
            }
        };

        fetchAdresa();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdresa(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/server/adrese/${id}`, adresa, config);
                history('/');
            } else {
                await axios.post('http://localhost:3000/server/adrese', adresa, config);
                history('/');
            }
        } catch (error) {
            console.error('Error creating or updating address:', error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Ažuriraj Adresu' : 'Nova Adresa'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ulica:</label>
                    <input
                        type="text"
                        name="ulica"
                        value={adresa.ulica}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Grad:</label>
                    <input
                        type="text"
                        name="grad"
                        value={adresa.grad}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Poštanski Broj:</label>
                    <input
                        type="text"
                        name="postanskiBroj"
                        value={adresa.postanskiBroj}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Država:</label>
                    <input
                        type="text"
                        name="drzava"
                        value={adresa.drzava}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Ažuriraj' : 'Kreiraj'}</button>
            </form>
        </div>
    );
};
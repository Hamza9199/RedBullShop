
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from "../komponente/Footer"
import Header from "../komponente/Header"
import './css/NovaAdresa.css';

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
        <>
        <Header />
        <div className="container" id="nova-adresa-container">
            <h1 id="form-title">{id ? 'Ažuriraj Adresu' : 'Nova Adresa'}</h1>
            <form onSubmit={handleSubmit} id="adresa-form">
                <div className="form-group" id="ulica-group">
                    <label className="label" htmlFor="ulica">Ulica:</label>
                    <input
                        type="text"
                        name="ulica"
                        id="ulica"
                        className="input"
                        value={adresa.ulica}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group" id="grad-group">
                    <label className="label" htmlFor="grad">Grad:</label>
                    <input
                        type="text"
                        name="grad"
                        id="grad"
                        className="input"
                        value={adresa.grad}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group" id="postanskiBroj-group">
                    <label className="label" htmlFor="postanskiBroj">Poštanski Broj:</label>
                    <input
                        type="text"
                        name="postanskiBroj"
                        id="postanskiBroj"
                        className="input"
                        value={adresa.postanskiBroj}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group" id="drzava-group">
                    <label className="label" htmlFor="drzava">Država:</label>
                    <input
                        type="text"
                        name="drzava"
                        id="drzava"
                        className="input"
                        value={adresa.drzava}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="button" id="submit-button">{id ? 'Ažuriraj' : 'Kreiraj'}</button>
            </form>
        </div>
        <Footer />
        </>
    );
};

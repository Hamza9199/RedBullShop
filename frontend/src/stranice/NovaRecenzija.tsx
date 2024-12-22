import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from "../komponente/Footer"
import Header from "../komponente/Header"
import './css/NovaRecenzija.css';

export const NovaRecenzija = () => {
    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');

    if (!token || !token.accessToken) {
        throw new Error('No token found');
    }

    const proizvodId = JSON.parse(localStorage.getItem('proizvod') || '{}');

    const [recenzija, setRecenzija] = useState({
        proizvodId: proizvodId || '',
        ocjena: 1,
        komentar: '',
        korisnikId: token.id || ''
    });

    const { id } = useParams();
    const history = useNavigate();

    const config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
    };

    useEffect(() => {
        const fetchRecenzija = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/server/recenzije/${id}`, config);
                    setRecenzija(response.data);
                } catch (error) {
                    console.error('Error fetching review:', error);
                }
            }
        };

        fetchRecenzija();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecenzija(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/server/recenzije/${id}`, recenzija, config);
                history('/');
            } else {
                await axios.post('http://localhost:3000/server/recenzije', { ...recenzija, korisnikId: token.id }, config);
                history('/');
            }
        } catch (error) {
            console.error('Error creating or updating review:', error);
        }
    };

    return (
        <>
        <Header />
        <div className="container" id="nova-recenzija-container">
            <h1 id="form-title">{id ? 'Ažuriraj Recenziju' : 'Nova Recenzija'}</h1>
            <form onSubmit={handleSubmit} id="recenzija-form">
                <div className="form-group" id="ocjena-group">
                    <label className="label" htmlFor="ocjena">Ocjena:</label>
                    <input
                        type="number"
                        name="ocjena"
                        id="ocjena"
                        className="input"
                        value={recenzija.ocjena}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="form-group" id="komentar-group">
                    <label className="label" htmlFor="komentar">Komentar:</label>
                    <textarea
                        name="komentar"
                        id="komentar"
                        className="textarea"
                        value={recenzija.komentar}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="button" id="submit-button">{id ? 'Ažuriraj' : 'Kreiraj'}</button>
            </form>
        </div>
        <Footer />
        </>
    );
};
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from "../komponente/Footer";
import Header from "../komponente/Header";
import './css/Recenzija.css';

export const Recenzija = () => {
    interface Recenzija {
        ocjena: number;
        komentar: string;
        korisnikId: string;
    }

    const [recenzija, setRecenzija] = useState<Recenzija | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
    const userId = token?.id;
    const isOwner = userId && String(recenzija?.korisnikId) === String(userId);

    useEffect(() => {
        const fetchRecenzija = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/server/recenzije/${id}`);
                setRecenzija(response.data);
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };

        fetchRecenzija();
    }, [id]);

    const handleDelete = async () => {
        if (!token?.accessToken) {
            console.error('No token found');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token.accessToken}` }
        };

        try {
            await axios.delete(`http://localhost:3000/server/recenzije/${id}`, config);
            navigate('/');
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="recenzija-container" id="recenzija-container">
                {recenzija ? (
                    <>
                        <h1 className="recenzija-title" id="recenzija-title">Recenzija</h1>
                        <p className="recenzija-ocjena" id="recenzija-ocjena">Ocjena: {recenzija.ocjena}</p>
                        <p className="recenzija-komentar" id="recenzija-komentar">Komentar: {recenzija.komentar}</p>
                        {isOwner && (
                            <div className="recenzija-buttons" id="recenzija-buttons">
                                <button className="recenzija-button" id="recenzija-button-update" onClick={() => navigate(`/update-recenzija/${id}`)}>Ažuriraj</button>
                                <button className="recenzija-button" id="recenzija-button-delete" onClick={handleDelete}>Obriši</button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="recenzija-loading" id="recenzija-loading">Učitavanje...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

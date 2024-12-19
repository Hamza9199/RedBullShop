import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
        <div>
            {recenzija ? (
                <>
                    <h1>Recenzija</h1>
                    <p>Ocjena: {recenzija.ocjena}</p>
                    <p>Komentar: {recenzija.komentar}</p>
                    {isOwner && (
                        <>
                            <button onClick={() => navigate(`/update-recenzija/${id}`)}>Ažuriraj</button>
                            <button onClick={handleDelete}>Obriši</button>
                        </>
                    )}
                </>
            ) : (
                <p>Učitavanje...</p>
            )}
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../fireBase";
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';

export const NoviProizvod = () => {
    const [proizvod, setProizvod] = useState({
        naziv: '',
        opis: '',
        kategorija: '',
        cijena: 0,
        slikaURL: ''
    });
    const [file, setFile] = useState<File | null>(null);
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
    }, [id, config]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setProizvod(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            
                const storageRef = ref(storage, `items/${new Date().getTime()}_${file?.name}`);
                if (file) {
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload je ${progress}% gotov`);
                        },
                        (error) => {
                            console.error('Error uploading file:', error);
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            setProizvod(prev => ({ ...prev, slikaURL: downloadURL }));
                            console.log('File available at', downloadURL);
                            // Nastavi sa kreiranjem ili ažuriranjem proizvoda nakon upload-a
                            if (id) {
                                await axios.put(`http://localhost:3000/server/proizvodi/${id}`, { ...proizvod, slikaURL: downloadURL }, config);
                            } else {
                                console.log('Update proizvoda:', proizvod);
                                await axios.post('http://localhost:3000/server/proizvodi', { ...proizvod, slikaURL: downloadURL }, config);
                            history('/');
                            }
                
                        }
                    );   
                }
        } catch (error) {
            console.error('Error creating or updating product:', error);
        }
    };

    return (
        <>
        <Header />
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
                    <select name="kategorija" value={proizvod.kategorija} onChange={handleChange} required>
                        <option value="">Odaberi kategoriju</option>
                        <option value="Igracke">Igracke</option>
                        <option value="Odjeca">Odjeća</option>
                        <option value="Obuca">Obuća</option>
                        <option value="Ostalo">Ostalo</option>
                    </select>
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
                    <label>Slika:</label>
                    <input
                        type="file"
                        name="slika"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">{id ? 'Ažuriraj' : 'Kreiraj'}</button>
            </form>
        </div>
        <Footer />
        </>
    );
};

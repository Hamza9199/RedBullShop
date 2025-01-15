import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';
import './css/Dashboard.css';
import { useNavigate } from 'react-router-dom';

// Definicija interfejsa za korisnika
interface Korisnik {
    id: string;
    username: string;
}

// Definicija interfejsa za proizvod
interface Proizvod {
    id: string;
    naziv: string;
    slikaURL: string;
}

// Definicija interfejsa za narudžbu
interface Narudzba {
    id: string;
    korisnikId: string;
    adresaId: string;
    ukupnaCijena: number;
    statusNarudzbe: string;
    placanjeMetoda: string;
    placanjeStatus: string;
    proizvodi: {
        proizvodId: string;
        kolicina: number;
    }[];
}

// Definicija interfejsa za recenziju
interface Recenzija {
    id: string;
    komentar: string;
}

// Definicija interfejsa za adresu
interface Adresa {
    id: string;
    ulica: string;
    grad: string;
}

const Dashboard: React.FC = () => {
    const [korisnici, setKorisnici] = useState<Korisnik[]>([]); // Stanje za korisnike
    const [proizvodi, setProizvodi] = useState<Proizvod[]>([]); // Stanje za proizvode
    const [narudzbe, setNarudzbe] = useState<Narudzba[]>([]); // Stanje za narudžbe
    const [recenzije, setRecenzije] = useState<Recenzija[]>([]); // Stanje za recenzije
    const [adrese, setAdrese] = useState<Adresa[]>([]); // Stanje za adrese
    const [selectedTab, setSelectedTab] = useState<string>('korisnici'); // Stanje za odabranu karticu
    const navigate = useNavigate(); // Hook za navigaciju

    // useEffect hook za dohvaćanje podataka
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
                const config = {
                    headers: { Authorization: `Bearer ${token.accessToken}` }
                };

                const [korisniciRes, proizvodiRes, narudzbeRes, recenzijeRes, adreseRes] = await Promise.all([
                    axios.get('http://localhost:3000/server/korisnici', config),
                    axios.get('http://localhost:3000/server/proizvodi', config),
                    axios.get('http://localhost:3000/server/narudzbe', config),
                    axios.get('http://localhost:3000/server/recenzije', config),
                    axios.get('http://localhost:3000/server/adrese', config),
                ]);

                setKorisnici(korisniciRes.data);
                setProizvodi(proizvodiRes.data);
                setNarudzbe(narudzbeRes.data);
                setRecenzije(recenzijeRes.data);
                setAdrese(adreseRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Funkcija za brisanje korisnika
    const handleDeleteKorisnika = async (id: string) => {
        try {
            const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
            const config = {
                headers: { Authorization: `Bearer ${token.accessToken}` }
            };

            await axios.delete(`http://localhost:3000/server/korisnici/${id}`, config);
            setKorisnici(korisnici.filter(korisnik => korisnik.id !== id));
        } catch (error) {
            console.error('Error deleting korisnik:', error);
        }
    };

    // Funkcija za brisanje proizvoda
    const handleDeleteProizvoda = async (id: string) => {
        try {
            const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
            const config = {
                headers: { Authorization: `Bearer ${token.accessToken}` }
            };

            await axios.delete(`http://localhost:3000/server/proizvodi/${id}`, config);
            setProizvodi(proizvodi.filter(proizvod => proizvod.id !== id));
        } catch (error) {
            console.error('Error deleting proizvod:', error);
        }
    };

    // Funkcija za brisanje narudžbe
    const handleDeleteNarudzbe = async (id: string) => {
        try {
            const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
            const config = {
                headers: { Authorization: `Bearer ${token.accessToken}` }
            };

            await axios.delete(`http://localhost:3000/server/narudzbe/${id}`, config);
            setNarudzbe(narudzbe.filter(narudzba => narudzba.id !== id));
        } catch (error) {
            console.error('Error deleting narudzba:', error);
        }
    };

    // Funkcija za brisanje recenzije
    const handleDeleteRecenzije = async (id: string) => {
        try {
            const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
            const config = {
                headers: { Authorization: `Bearer ${token.accessToken}` }
            };

            await axios.delete(`http://localhost:3000/server/recenzije/${id}`, config);
            setRecenzije(recenzije.filter(recenzija => recenzija.id !== id));
        } catch (error) {
            console.error('Error deleting recenzija:', error);
        }
    };

    // Funkcija za brisanje adrese
    const handleDeleteAdrese = async (id: string) => {
        try {
            const token = JSON.parse(localStorage.getItem("korisnik") || '{}');
            const config = {
                headers: { Authorization: `Bearer ${token.accessToken}` }
            };

            await axios.delete(`http://localhost:3000/server/adrese/${id}`, config);
            setAdrese(adrese.filter(adresa => adresa.id !== id));
        } catch (error) {
            console.error('Error deleting adresa:', error);
        }
    };

    // Funkcija za ažuriranje proizvoda
    const handleUpdateProizvoda = async (id: string) => {
        navigate(`/update-proizvod/${id}`);
    };

    // Funkcija za ažuriranje narudžbe
    const handleUpdateNarudzbe = async (id: string) => {
        navigate(`/azuriraj-narudzbu/${id}`);
    };

    // Funkcija za ažuriranje recenzije
    const handleUpdateRecenzije = async (id: string) => {
        navigate(`/update-recenzija/${id}`);
    };

    // Funkcija za dodavanje novog proizvoda
    const handleDodajProizvod = async () => {
        navigate(`/novi-proizvod`);
    };

    // Funkcija za renderiranje sadržaja na temelju odabrane kartice
    const renderContent = () => {
        switch (selectedTab) {
            case 'korisnici':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Metode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {korisnici.map(korisnik => (
                                <tr key={korisnik.id}>
                                    <td>{korisnik.id}</td>
                                    <td>{korisnik.username}</td>
                                    <td>
                                        <button onClick={() => handleDeleteKorisnika(korisnik.id)}>Izbriši</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'proizvodi':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Slika</th>
                                <th>Naziv</th>
                                <th>Metode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proizvodi.map(proizvod => (
                                <tr key={proizvod.id}>
                                    <td>{proizvod.id}</td>
                                    <td><img src={proizvod.slikaURL} alt={proizvod.naziv} style={{ width: '50px' }} /></td>
                                    <td>{proizvod.naziv}</td>
                                    <td>
                                        <button onClick={() => handleUpdateProizvoda(proizvod.id)}>Uredi</button>
                                        <button onClick={() => handleDeleteProizvoda(proizvod.id)}>Izbriši</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'narudzbe':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Korisnik ID</th>
                                <th>Adresa ID</th>
                                <th>Ukupna cijena</th>
                                <th>Status narudžbe</th>
                                <th>Plaćanje metoda</th>
                                <th>Plaćanje status</th>
                                <th>Proizvodi</th>
                                <th>Metode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {narudzbe.map(narudzba => (
                                <tr key={narudzba.id}>
                                    <td>{narudzba.id}</td>
                                    <td>{narudzba.korisnikId}</td>
                                    <td>{narudzba.adresaId}</td>
                                    <td>{narudzba.ukupnaCijena}</td>
                                    <td>{narudzba.statusNarudzbe}</td>
                                    <td>{narudzba.placanjeMetoda}</td>
                                    <td>{narudzba.placanjeStatus}</td>
                                    <td>
                                        <ul>
                                            {narudzba.proizvodi.map(proizvod => (
                                                <li key={proizvod.proizvodId}>{proizvodi.find(p => p.id === proizvod.proizvodId)?.naziv} - {proizvod.kolicina} kom</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdateNarudzbe(narudzba.id)}>Uredi</button>
                                        <button onClick={() => handleDeleteNarudzbe(narudzba.id)}>Izbriši</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'recenzije':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Komentar</th>
                                <th>Metode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recenzije.map(recenzija => (
                                <tr key={recenzija.id}>
                                    <td>{recenzija.id}</td>
                                    <td>{recenzija.komentar}</td>
                                    <td>
                                        <button onClick={() => handleUpdateRecenzije(recenzija.id)}>Uredi</button>
                                        <button onClick={() => handleDeleteRecenzije(recenzija.id)}>Izbriši</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'adrese':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ulica</th>
                                <th>Grad</th>
                                <th>Metode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adrese.map(adresa => (
                                <tr key={adresa.id}>
                                    <td>{adresa.id}</td>
                                    <td>{adresa.ulica}</td>
                                    <td>{adresa.grad}</td>
                                    <td>
                                        <button onClick={() => handleDeleteAdrese(adresa.id)}>Izbriši</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <aside className="sidebar">
                        <nav>
                            <ul>
                                <li><button onClick={() => setSelectedTab('korisnici')}>Korisnici</button></li>
                                <li><button onClick={() => setSelectedTab('proizvodi')}>Proizvodi</button></li>
                                <li><button onClick={() => setSelectedTab('narudzbe')}>Narudžbe</button></li>
                                <li><button onClick={() => setSelectedTab('recenzije')}>Recenzije</button></li>
                                <li><button onClick={() => setSelectedTab('adrese')}>Adrese</button></li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="main-content">
                        <h1>Dashboard</h1>
                        <button className='dodaj-dugme' onClick={() => handleDodajProizvod()}>Dodaj</button>
                        {renderContent()}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;

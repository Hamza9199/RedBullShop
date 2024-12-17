import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../komponente/Header';
import Footer from '../komponente/Footer';

interface Korisnik {
    _id: string;
    username: string;
}

interface Proizvod {
    _id: string;
    naziv: string;
    slikaURL: string;
}

interface Narudzba {
    _id: string;
}

interface Recenzija {
    _id: string;
    komentar: string;
}

interface Adresa {
    _id: string;
    ulica: string;
    grad: string;
}

const Dashboard: React.FC = () => {
    const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
    const [proizvodi, setProizvodi] = useState<Proizvod[]>([]);
    const [narudzbe, setNarudzbe] = useState<Narudzba[]>([]);
    const [recenzije, setRecenzije] = useState<Recenzija[]>([]);
    const [adrese, setAdrese] = useState<Adresa[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const korisnik = localStorage.getItem("korisnik");

                if (!korisnik) {
                    throw new Error('No token found');
                }
                const token = JSON.parse(korisnik);


                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const korisniciRes = await axios.get('http://localhost:3000/server/korisnici', config);
                const proizvodiRes = await axios.get('http://localhost:3000/server/proizvodi', config);
                const narudzbeRes = await axios.get('http://localhost:3000/server/narudzbe', config);
                const recenzijeRes = await axios.get('http://localhost:3000/server/recenzije', config);
                const adreseRes = await axios.get('http://localhost:3000/server/adrese', config);

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

    return (
        <div>
            <Header />
            <main>
                <h1>Dashboard</h1>
                <section>
                    <h2>Korisnici</h2>
                    <ul>
                        {korisnici.map((korisnik: Korisnik) => (
                            <li key={korisnik._id}>{korisnik.username}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Proizvodi</h2>
                    <ul>
                        {proizvodi.map((proizvod: Proizvod) => (
                            <div key={proizvod._id}>
                                <li>{proizvod.naziv}</li>
                                <img src={proizvod.slikaURL} alt={proizvod.naziv} />
                            </div>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Narudžbe</h2>
                    <ul>
                        {narudzbe.map((narudzba: Narudzba) => (
                            <li key={narudzba._id}>{narudzba._id}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Recenzije</h2>
                    <ul>
                        {recenzije.map((recenzija: Recenzija) => (
                            <li key={recenzija._id}>{recenzija.komentar}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Adrese</h2>
                    <ul>
                        {adrese.map((adresa: Adresa) => (
                            <li key={adresa._id}>{adresa.ulica}, {adresa.grad}</li>
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
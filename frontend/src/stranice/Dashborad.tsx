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
    const [proizvodi, setProizvodi] = useState([]);
    const [narudzbe, setNarudzbe] = useState([]);
    const [recenzije, setRecenzije] = useState([]);
    const [adrese, setAdrese] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const korisniciRes = await axios.get('/server/korisnici');
                const proizvodiRes = await axios.get('/server/proizvodi');
                const narudzbeRes = await axios.get('/server/narudzbe');
                const recenzijeRes = await axios.get('/server/recenzije');
                const adreseRes = await axios.get('/server/adrese');

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
                            <li key={proizvod._id}>{proizvod.naziv}</li>
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
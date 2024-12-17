import React, { useState } from 'react';
import axios from 'axios';

const Narudzba: React.FC = () => {
    const [adresa, setAdresa] = useState('');
    const [placanje, setPlacanje] = useState('Kartica');
    const [ukupnaCijena, setUkupnaCijena] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [proizvodi, setProizvodi] = useState([]);

    const handleNarudzba = async () => {
        try {
            const response = await axios.post('/api/narudzbe', {
                proizvodi,
                adresa,
                ukupnaCijena,
                placanje: {
                    metoda: placanje,
                    status: 'Čeka se'
                }
            });
            console.log('Narudžba uspješno kreirana:', response.data);
        } catch (error) {
            console.error('Greška prilikom kreiranja narudžbe:', error);
        }
    };

    return (
        <div>
            <h1>Narudžba</h1>
            <div>
                <label>Adresa:</label>
                <input
                    type="text"
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                />
            </div>
            <div>
                <label>Način plaćanja:</label>
                <select
                    value={placanje}
                    onChange={(e) => setPlacanje(e.target.value)}
                >
                    <option value="Kartica">Kartica</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Pouzećem">Pouzećem</option>
                </select>
            </div>
            <div>
                <label>Ukupna cijena:</label>
                <input
                    type="number"
                    value={ukupnaCijena}
                    onChange={(e) => setUkupnaCijena(Number(e.target.value))}
                />
            </div>
            <button onClick={handleNarudzba}>Potvrdi narudžbu</button>
        </div>
    );
};

export default Narudzba;
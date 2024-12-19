const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const autentifikacijaRuter = require('./rute/autentifikacija');
const korisniciRuter = require('./rute/korisnici');
const proizvodiRuter = require('./rute/proizvodi');
const adreseRuter = require('./rute/adrese');
const narudzbeRuter = require('./rute/narudzbe');
const korpeRuter = require('./rute/korpe');
const recenzijeRuter = require('./rute/recenzije');
const sequelize = require('./sequelizeInstance')
const Korisnik = require('./modeli/Korisnik')
const Korpa = require('./modeli/Korpa')
const Proizvod = require('./modeli/Proizvod')
const Narudzba = require('./modeli/Narudzba')
const Recenzija = require('./modeli/Recenzija')
const Adresa = require('./modeli/Adresa')


const app = express();
require('dotenv').config();
dotenv.config();
const PORT = 3000;



// Testiranje konekcije s bazom
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Konekcija s MySQL bazom je uspješna.');
        await sequelize.sync({ alter: true }); // Sinhronizacija modela s bazom
        console.log('Baza sinhronizovana.');
    } catch (error) {
        console.error('Greška pri konekciji s bazom:', error);
        process.exit(1);
    }
})();


// CORS opcije
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rute
app.use('/server/autentifikacija', autentifikacijaRuter);
app.use('/server/korisnici', korisniciRuter);
app.use('/server/proizvodi', proizvodiRuter);
app.use('/server/adrese', adreseRuter);
app.use('/server/narudzbe', narudzbeRuter);
app.use('/server/korpe', korpeRuter);
app.use('/server/recenzije', recenzijeRuter);

// Startovanje servera
app.listen(PORT, () => {
    console.log(`Server pokrenut na http://localhost:${PORT}`);
});


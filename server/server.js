const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const autentifikacijaRuter = require('./kontroleri/autentifikacija');
const korisniciRuter = require('./kontroleri/korisnici');
const proizvodiRuter = require('./kontroleri/proizvodi');
const adreseRuter = require('./kontroleri/adrese');
const narudzbeRuter = require('./kontroleri/narudzbe');
const korpeRuter = require('./kontroleri/korpe');
const recenzijeRuter = require('./kontroleri/recenzije');
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


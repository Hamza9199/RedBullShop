const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const autentifikacijaRuter = require('./rute/autentifikacija');
const korisniciRuter = require('./rute/korisnici');


dotenv.config();
const PORT = 3000;


mongoose.connect(process.env.mongo_url, {
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.error(err));

const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};


app.use(cors(corsOptions));
app.use(express.json());


app.use('/server/autentifikacija', autentifikacijaRuter);
app.use('/server/korisnici', korisniciRuter);


app.listen(PORT, () => {
    console.log(`Server pokrenut na http://localhost:${PORT}`);
});

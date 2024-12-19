const express = require('express');
const Korisnik = require('../modeli/Korisnik'); // Sequelize model
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const ruter = express.Router();

// POST: Registracija korisnika
ruter.post('/registracija', async (zahtjev, odgovor) => {
    console.log('Zahtjev body:', zahtjev.body); 
    try {
        const noviKorisnik = await Korisnik.create({
            username: zahtjev.body.username,
            email: zahtjev.body.email,
            password: CryptoJS.AES.encrypt(zahtjev.body.password, process.env.tajna).toString()
        });
        odgovor.status(201).json(noviKorisnik);
    } catch (err) {
        console.error('Greška tokom registracije:', err); 
        odgovor.status(500).json({ message: 'Server error', error: err.message });
    }
});


// POST: Login korisnika
ruter.post('/login', async (zahtjev, odgovor) => {
    try {
        const { email, password } = zahtjev.body;
        const korisnik = await Korisnik.findOne({ where: { email } });

        if (!korisnik) {
            return odgovor.status(401).json('Pogrešna sifra ili email!');
        }

        const bytes = CryptoJS.AES.decrypt(korisnik.password, process.env.tajna);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            return odgovor.status(401).json('Pogrešna sifra!');
        }

        const accessToken = jwt.sign({
            id: korisnik.id,
            isAdmin: korisnik.isAdmin
        }, process.env.tajna, { expiresIn: '7d' });

        const { password: pwd, ...ostalo } = korisnik.get();
        odgovor.status(200).json({ ...ostalo, accessToken });
    } catch (err) {
        odgovor.status(500).json(err);
    }
});

module.exports = ruter;

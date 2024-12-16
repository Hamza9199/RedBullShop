const express = require('express');
const mongoose = require('mongoose');
const Narudzba = require('../modeli/Narudzba');
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { proizvodi, adresa, ukupnaCijena, placanje } = zahtjev.body;

        const novaNarudzba = new Narudzba({
            korisnikId: zahtjev.korisnik.id,
            proizvodi,
            adresa,
            ukupnaCijena,
            placanje
        });

        const sacuvanaNarudzba = await novaNarudzba.save();
        odgovor.status(201).json(sacuvanaNarudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const narudzbe = await Narudzba.find({ korisnikId: zahtjev.korisnik.id }).populate('adresa');
        odgovor.status(200).json(narudzbe);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const narudzba = await Narudzba.findOne({
            _id: zahtjev.params.id,
            korisnikId: zahtjev.korisnik.id
        }).populate('adresa');

        if (!narudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        odgovor.status(200).json(narudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.put('/:id/status', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { statusNarudzbe } = zahtjev.body;

        const azuriranaNarudzba = await Narudzba.findOneAndUpdate(
            { _id: zahtjev.params.id, korisnikId: zahtjev.korisnik.id },
            { statusNarudzbe },
            { new: true }
        );

        if (!azuriranaNarudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        odgovor.status(200).json(azuriranaNarudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const obrisanaNarudzba = await Narudzba.findOneAndDelete({
            _id: zahtjev.params.id,
            korisnikId: zahtjev.korisnik.id
        });

        if (!obrisanaNarudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        odgovor.status(200).json("Narudžba je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

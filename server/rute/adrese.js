const express = require('express');
const mongoose = require('mongoose');
const Adresa = require('../modeli/Adresa');
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const novaAdresa = new Adresa({ ...zahtjev.body, korisnikId: zahtjev.korisnik.id });
        const sacuvanaAdresa = await novaAdresa.save();
        odgovor.status(201).json(sacuvanaAdresa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.put('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const azuriranaAdresa = await Adresa.findOneAndUpdate(
            { _id: zahtjev.params.id, korisnikId: zahtjev.korisnik.id },
            { $set: zahtjev.body },
            { new: true }
        );

        if (!azuriranaAdresa) {
            return odgovor.status(404).json("Adresa nije pronađena ili nemate dozvolu za izmjenu.");
        }

        odgovor.status(200).json(azuriranaAdresa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const obrisanaAdresa = await Adresa.findOneAndDelete({
            _id: zahtjev.params.id,
            korisnikId: zahtjev.korisnik.id
        });

        if (!obrisanaAdresa) {
            return odgovor.status(404).json("Adresa nije pronađena ili nemate dozvolu za brisanje.");
        }

        odgovor.status(200).json("Adresa je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const adrese = await Adresa.find({ korisnikId: zahtjev.korisnik.id });
        odgovor.status(200).json(adrese);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const adresa = await Adresa.findOne({
            _id: zahtjev.params.id,
            korisnikId: zahtjev.korisnik.id
        });

        if (!adresa) {
            return odgovor.status(404).json("Adresa nije pronađena.");
        }

        odgovor.status(200).json(adresa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

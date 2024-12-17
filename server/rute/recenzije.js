const express = require('express');
const mongoose = require('mongoose');
const Recenzija = require('../modeli/Recenzija');
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { proizvodId, ocjena, komentar } = zahtjev.body;

        const postojecaRecenzija = await Recenzija.findOne({
            korisnikId: zahtjev.korisnik.id,
            proizvodId
        });

        if (postojecaRecenzija) {
            return odgovor.status(400).json("Već ste ostavili recenziju za ovaj proizvod.");
        }

        const novaRecenzija = new Recenzija({
            korisnikId: zahtjev.korisnik.id,
            proizvodId,
            ocjena,
            komentar
        });

        const sacuvanaRecenzija = await novaRecenzija.save();
        odgovor.status(201).json(sacuvanaRecenzija);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/', async (zahtjev, odgovor) => {
    try {
        const recenzije = await Recenzija.find();
        odgovor.status(200).json(recenzije);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/:proizvodId', async (zahtjev, odgovor) => {
    try {
        const recenzije = await Recenzija.find({ proizvodId: zahtjev.params.proizvodId });
        odgovor.status(200).json(recenzije);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/:proizvodId/moj', verifikacija, async (zahtjev, odgovor) => {
    try {
        const recenzija = await Recenzija.findOne({
            proizvodId: zahtjev.params.proizvodId,
            korisnikId: zahtjev.korisnik.id
        });

        if (!recenzija) {
            return odgovor.status(404).json("Niste ostavili recenziju za ovaj proizvod.");
        }

        odgovor.status(200).json(recenzija);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.put('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { ocjena, komentar } = zahtjev.body;

        const azuriranaRecenzija = await Recenzija.findOneAndUpdate(
            { _id: zahtjev.params.id, korisnikId: zahtjev.korisnik.id },
            { ocjena, komentar },
            { new: true }
        );

        if (!azuriranaRecenzija) {
            return odgovor.status(404).json("Recenzija nije pronađena.");
        }

        odgovor.status(200).json(azuriranaRecenzija);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const obrisanaRecenzija = await Recenzija.findOneAndDelete({
            _id: zahtjev.params.id,
            korisnikId: zahtjev.korisnik.id
        });

        if (!obrisanaRecenzija) {
            return odgovor.status(404).json("Recenzija nije pronađena.");
        }

        odgovor.status(200).json("Recenzija je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

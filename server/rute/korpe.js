const express = require('express');
const mongoose = require('mongoose');
const Korpa = require('../modeli/Korpa');
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { proizvodi, ukupnaCijena } = zahtjev.body;

        let korpa = await Korpa.findOne({ korisnikId: zahtjev.korisnik.id });

        if (korpa) {
            // Ako korpa već postoji, ažuriraj proizvode i cijenu
            korpa.proizvodi = proizvodi;
            korpa.ukupnaCijena = ukupnaCijena;
        } else {
            // Ako korpa ne postoji, kreiraj novu
            korpa = new Korpa({
                korisnikId: zahtjev.korisnik.id,
                proizvodi,
                ukupnaCijena
            });
        }

        const sacuvanaKorpa = await korpa.save();
        odgovor.status(200).json(sacuvanaKorpa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.get('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const korpa = await Korpa.findOne({ korisnikId: zahtjev.korisnik.id });

        if (!korpa) {
            return odgovor.status(404).json("Korpa nije pronađena.");
        }

        odgovor.status(200).json(korpa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.put('/obrisi-proizvod/:proizvodId', verifikacija, async (zahtjev, odgovor) => {
    try {
        const korpa = await Korpa.findOne({ korisnikId: zahtjev.korisnik.id });

        if (!korpa) {
            return odgovor.status(404).json("Korpa nije pronađena.");
        }

        korpa.proizvodi = korpa.proizvodi.filter(
            (proizvod) => proizvod.proizvodId !== zahtjev.params.proizvodId
        );

        korpa.ukupnaCijena = korpa.proizvodi.reduce((ukupno, proizvod) => {
            return ukupno + proizvod.kolicina * proizvod.cijena; // Pretpostavka: cijena je definirana za proizvode
        }, 0);

        const azuriranaKorpa = await korpa.save();
        odgovor.status(200).json(azuriranaKorpa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

ruter.delete('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const korpa = await Korpa.findOneAndDelete({ korisnikId: zahtjev.korisnik.id });

        if (!korpa) {
            return odgovor.status(404).json("Korpa nije pronađena.");
        }

        odgovor.status(200).json("Korpa je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

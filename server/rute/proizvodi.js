const express = require('express');
const mongoose = require('mongoose');
const Proizvod = require('../modeli/Proizvod');
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.isAdmin) {
        const noviProizvod = new Proizvod(zahtjev.body);
        try {
            const sacuvanProizvod = await noviProizvod.save();
            odgovor.status(201).json(sacuvanProizvod);
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Niste autorizovani za ovu akciju");
    }
});

ruter.put('/:id', verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.isAdmin) {
        try {
            const azuriranProizvod = await Proizvod.findByIdAndUpdate(
                zahtjev.params.id,
                { $set: zahtjev.body },
                { new: true }
            );
            odgovor.status(200).json(azuriranProizvod);
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Niste autorizovani za ovu akciju");
    }
});

ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.isAdmin) {
        try {
            await Proizvod.findByIdAndDelete(zahtjev.params.id);
            odgovor.status(200).json("Proizvod je uspješno obrisan");
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Niste autorizovani za ovu akciju");
    }
});

ruter.get('/', async (zahtjev, odgovor) => {
    const query = zahtjev.query.new;
    try {
        const proizvodi = query
            ? await Proizvod.find().sort({ createdAt: -1 }).limit(5)
            : await Proizvod.find();
        odgovor.status(200).json(proizvodi);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});


ruter.get('/:id', async (zahtjev, odgovor) => {
    try {
        const proizvod = await Proizvod.findById(zahtjev.params.id);
        odgovor.status(200).json(proizvod);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});


ruter.get('/statistika', async (zahtjev, odgovor) => {
    const danasnjiDatum = new Date();
    const proslaGodina = new Date(
        danasnjiDatum.setFullYear(danasnjiDatum.getFullYear() - 1)
    );

    try {
        const podaci = await Proizvod.aggregate([
            {
                $project: {
                    mjesec: { $month: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: '$mjesec',
                    broj: { $sum: 1 },
                },
            },
        ]);

        odgovor.status(200).json(podaci);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

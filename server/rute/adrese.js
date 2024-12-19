const express = require('express');
const Adresa = require('../modeli/Adresa'); // Sequelize model
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

// POST: Dodavanje nove adrese
ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const novaAdresa = await Adresa.create({ 
            ...zahtjev.body, 
            korisnikId: zahtjev.korisnik.id 
        });
        odgovor.status(201).json(novaAdresa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// PUT: Ažuriranje adrese
ruter.put('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const azuriranaAdresa = await Adresa.update(zahtjev.body, {
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            },
            returning: true,
            plain: true
        });

        if (azuriranaAdresa[0] === 0) {
            return odgovor.status(404).json("Adresa nije pronađena ili nemate dozvolu za izmjenu.");
        }

        odgovor.status(200).json(azuriranaAdresa[1]);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// DELETE: Brisanje adrese
ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const brojObrisanih = await Adresa.destroy({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (brojObrisanih === 0) {
            return odgovor.status(404).json("Adresa nije pronađena ili nemate dozvolu za brisanje.");
        }

        odgovor.status(200).json("Adresa je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati sve adrese korisnika
ruter.get('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const adrese = await Adresa.findAll({
            where: { korisnikId: zahtjev.korisnik.id }
        });
        odgovor.status(200).json(adrese);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati adresu po ID-u
ruter.get('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const adresa = await Adresa.findOne({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
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

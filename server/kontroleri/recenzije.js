const express = require('express');
const Recenzija = require('../modeli/Recenzija'); // Sequelize model
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

// POST: Kreiranje nove recenzije
ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { proizvodId, ocjena, komentar, korisnikId } = zahtjev.body;

        // Provjera da li korisnik već ima recenziju za proizvod
        const postojecaRecenzija = await Recenzija.findOne({
            where: {
                korisnikId: korisnikId,
                proizvodId: proizvodId
            }
        });

        if (postojecaRecenzija) {
            return odgovor.status(400).json("Već ste ostavili recenziju za ovaj proizvod.");
        }

        // Kreiranje nove recenzije
        const novaRecenzija = await Recenzija.create({
            korisnikId: korisnikId,
            proizvodId,
            ocjena,
            komentar
        });

        odgovor.status(201).json(novaRecenzija);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati sve recenzije
ruter.get('/', async (zahtjev, odgovor) => {
    try {
        const recenzije = await Recenzija.findAll();
        odgovor.status(200).json(recenzije);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

//GET: Dohvati specificnu recenziju
ruter.get('/:id', async (zahtjev, odgovor) => {
    try {
        const recenzija = await Recenzija.findOne({
            where: {
                id: zahtjev.params.id
            }
        });
        odgovor.status(200).json(recenzija);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});


// GET: Dohvati recenzije za specifičan proizvod
ruter.get('/:proizvodId/sve', async (zahtjev, odgovor) => {
    try {
        const recenzije = await Recenzija.findAll({
            where: {
                proizvodId: zahtjev.params.proizvodId
            }
        });
        odgovor.status(200).json(recenzije);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});



// GET: Dohvati recenziju korisnika za specifičan proizvod
ruter.get('/:proizvodId/moj', verifikacija, async (zahtjev, odgovor) => {
    try {
        const recenzija = await Recenzija.findOne({
            where: {
                proizvodId: zahtjev.params.proizvodId,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (!recenzija) {
            return odgovor.status(404).json("Niste ostavili recenziju za ovaj proizvod.");
        }

        odgovor.status(200).json(recenzija);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// PUT: Ažuriranje recenzije
ruter.put('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { ocjena, komentar } = zahtjev.body;

        const azuriranaRecenzija = await Recenzija.findOne({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (!azuriranaRecenzija) {
            return odgovor.status(404).json("Recenzija nije pronađena.");
        }

        azuriranaRecenzija.ocjena = ocjena;
        azuriranaRecenzija.komentar = komentar;

        await azuriranaRecenzija.save();
        odgovor.status(200).json(azuriranaRecenzija);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// DELETE: Brisanje recenzije
ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const obrisanaRecenzija = await Recenzija.findOne({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (!obrisanaRecenzija) {
            return odgovor.status(404).json("Recenzija nije pronađena.");
        }

        await obrisanaRecenzija.destroy();
        odgovor.status(200).json("Recenzija je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

const express = require('express');
const Proizvod = require('../modeli/Proizvod'); // Sequelize model
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

// POST: Kreiranje novog proizvoda
ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.isAdmin) {
        try {
            const { naziv, opis, kategorija, cijena, slikaURL } = zahtjev.body;
            console.log(zahtjev.body);
            const noviProizvod = await Proizvod.create(zahtjev.body);
            odgovor.status(201).json(noviProizvod);
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Niste autorizovani za ovu akciju");
    }
});

// PUT: Ažuriranje proizvoda
ruter.put('/:id', verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.isAdmin) {
        try {
            const azuriranProizvod = await Proizvod.findByPk(zahtjev.params.id);

            if (!azuriranProizvod) {
                return odgovor.status(404).json("Proizvod nije pronađen");
            }

            await azuriranProizvod.update(zahtjev.body);
            odgovor.status(200).json(azuriranProizvod);
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Niste autorizovani za ovu akciju");
    }
});

// DELETE: Brisanje proizvoda
ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.isAdmin) {
        try {
            const proizvod = await Proizvod.findByPk(zahtjev.params.id);

            if (!proizvod) {
                return odgovor.status(404).json("Proizvod nije pronađen");
            }

            await proizvod.destroy();
            odgovor.status(200).json("Proizvod je uspješno obrisan");
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Niste autorizovani za ovu akciju");
    }
});

// GET: Dohvati sve proizvode
ruter.get('/', async (zahtjev, odgovor) => {
    const query = zahtjev.query.new;
    try {
        const proizvodi = query
            ? await Proizvod.findAll({
                order: [['createdAt', 'DESC']],
                limit: 5
            })
            : await Proizvod.findAll();
        odgovor.status(200).json(proizvodi);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati specifičan proizvod
ruter.get('/:id', async (zahtjev, odgovor) => {
    try {
        const proizvod = await Proizvod.findByPk(zahtjev.params.id);
        if (!proizvod) {
            return odgovor.status(404).json("Proizvod nije pronađen");
        }
        odgovor.status(200).json(proizvod);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Statistika o proizvodima po mjesecima
ruter.get('/statistika', async (zahtjev, odgovor) => {
    const danasnjiDatum = new Date();
    const proslaGodina = new Date(
        danasnjiDatum.setFullYear(danasnjiDatum.getFullYear() - 1)
    );

    try {
        const podaci = await Proizvod.findAll({
            attributes: [
                [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'mjesec'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'broj']
            ],
            group: ['mjesec'],
            raw: true
        });

        odgovor.status(200).json(podaci);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

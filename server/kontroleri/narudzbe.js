const express = require('express');
const Narudzba = require('../modeli/Narudzba'); // Sequelize model
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

// POST: Kreiranje nove narudžbe
ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { korisnikId, adresaId, ukupnaCijena, placanjeMetoda, proizvodi } = zahtjev.body;

        // Kreiranje nove narudžbe
        const novaNarudzba = await Narudzba.create({
            korisnikId: zahtjev.body.korisnikId,
            adresaId: zahtjev.body.adresaId,
            ukupnaCijena: zahtjev.body.ukupnaCijena,
            statusNarudzbe: 'Na čekanju',
            placanjeMetoda: zahtjev.body.placanjeMetoda,
            placanjeStatus: 'Čeka se',
            proizvodi: zahtjev.body.proizvodi
        });

        odgovor.status(201).json(novaNarudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati sve narudžbe za korisnika
ruter.get('/korisnik', verifikacija, async (zahtjev, odgovor) => {
    try {
        const narudzbe = await Narudzba.findAll({
            where: { korisnikId: zahtjev.body.id }
        });

        odgovor.status(200).json(narudzbe);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});


//GET: Dohvati sve narudžbe
ruter.get('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const narudzbe = await Narudzba.findAll();

        odgovor.status(200).json(narudzbe);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati specifičnu narudžbu
ruter.get('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const narudzba = await Narudzba.findByPk(zahtjev.params.id);

        if (!narudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        odgovor.status(200).json(narudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati specifičnu narudžbu za korisnika
ruter.get('/korisnik/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const narudzba = await Narudzba.findOne({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (!narudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        odgovor.status(200).json(narudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});


// PUT: Ažuriranje narudžbe
ruter.put('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { korisnikId, adresaId, ukupnaCijena, statusNarudzbe, placanjeMetoda, placanjeStatus, proizvodi } = zahtjev.body;

        const azuriranaNarudzba = await Narudzba.findOne({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (!azuriranaNarudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        azuriranaNarudzba.korisnikId = korisnikId;
        azuriranaNarudzba.adresaId = adresaId;
        azuriranaNarudzba.ukupnaCijena = ukupnaCijena;
        azuriranaNarudzba.statusNarudzbe = statusNarudzbe;
        azuriranaNarudzba.placanjeMetoda = placanjeMetoda;
        azuriranaNarudzba.placanjeStatus = placanjeStatus;
        azuriranaNarudzba.proizvodi = proizvodi;
        await azuriranaNarudzba.save();

        odgovor.status(200).json(azuriranaNarudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// PUT: Ažuriranje statusa narudžbe
ruter.put('/:id/status', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { statusNarudzbe } = zahtjev.body;

        const azuriranaNarudzba = await Narudzba.findOne({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (!azuriranaNarudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        azuriranaNarudzba.statusNarudzbe = statusNarudzbe;
        await azuriranaNarudzba.save();

        odgovor.status(200).json(azuriranaNarudzba);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// DELETE: Brisanje narudžbe
ruter.delete('/:id', verifikacija, async (zahtjev, odgovor) => {
    try {
        const obrisanaNarudzba = await Narudzba.findOne({
            where: {
                id: zahtjev.params.id,
                korisnikId: zahtjev.korisnik.id
            }
        });

        if (!obrisanaNarudzba) {
            return odgovor.status(404).json("Narudžba nije pronađena.");
        }

        await obrisanaNarudzba.destroy();
        odgovor.status(200).json("Narudžba je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

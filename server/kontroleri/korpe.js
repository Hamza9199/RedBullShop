const express = require('express');
const Korpa = require('../modeli/Korpa'); // Sequelize model
const verifikacija = require('../verifikacijaTokena');
const ruter = express.Router();

// POST: Dodavanje ili ažuriranje korpe
ruter.post('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const { korisnikId, ukupnaCijena, proizvodi } = zahtjev.body;

        let korpa = await Korpa.findOne({ where: { korisnikId: zahtjev.body.korisnikId } });

        if (korpa) {
            korpa.proizvodi = proizvodi;
            korpa.ukupnaCijena = ukupnaCijena;
            await korpa.save();
        } else {
            korpa = await Korpa.create({
                korisnikId,
                ukupnaCijena,
                proizvodi,
            });
        }

        odgovor.status(200).json(korpa);
    } catch (greska) {
        console.error(greska); // Log the error
        odgovor.status(500).json({ message: 'Error occurred while adding to cart', error: greska.message });
    }
});



// GET: Dohvati korpu korisnika
ruter.get('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const korisnikId = zahtjev.query.id || zahtjev.params.id; 

        if (!korisnikId) {
            return odgovor.status(400).json("Korisnik ID nije pružen.");
        }

        const korpa = await Korpa.findOne({ where: { korisnikId: korisnikId } });

        if (!korpa) {
            return odgovor.status(404).json("Korpa nije pronađena.");
        }

        odgovor.status(200).json(korpa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});


// PUT: Brisanje proizvoda iz korpe
ruter.put('/obrisi-proizvod/:proizvodId', verifikacija, async (zahtjev, odgovor) => {
    try {
        const korpa = await Korpa.findOne({ where: { korisnikId: zahtjev.body.id } });

        if (!korpa) {
            return odgovor.status(404).json("Korpa nije pronađena.");
        }

        // Filtriraj proizvode koji nisu označeni za brisanje
        korpa.proizvodi = korpa.proizvodi.filter(
            (proizvod) => proizvod.proizvodId !== zahtjev.params.proizvodId
        );

        // Ažuriraj ukupnu cijenu korpe
        korpa.ukupnaCijena = korpa.proizvodi.reduce((ukupno, proizvod) => {
            return ukupno + proizvod.kolicina * proizvod.cijena; // Pretpostavka: cijena je definirana za proizvode
        }, 0);

        await korpa.save();
        odgovor.status(200).json(korpa);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// DELETE: Brisanje cijele korpe
ruter.delete('/', verifikacija, async (zahtjev, odgovor) => {
    try {
        const korpa = await Korpa.findOne({ where: { korisnikId: zahtjev.body.id } });

        if (!korpa) {
            return odgovor.status(404).json("Korpa nije pronađena.");
        }

        await korpa.destroy(); // Brisanje korpe iz baze
        odgovor.status(200).json("Korpa je uspješno obrisana.");
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

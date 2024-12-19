const ruter = require('express').Router();
const Korisnik = require('../modeli/Korisnik'); // Sequelize model
const CryptoJS = require('crypto-js');
const verifikacija = require('../verifikacijaTokena');

// PUT: Ažuriranje korisnika
ruter.put("/:id", verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.id === zahtjev.params.id || zahtjev.korisnik.isAdmin) {
        if (zahtjev.body.password) {
            zahtjev.body.password = CryptoJS.AES.encrypt(
                zahtjev.body.password,
                process.env.tajna
            ).toString();
        }

        try {
            const [affectedRows, [azuriranKorisnik]] = await Korisnik.update(zahtjev.body, {
                where: { id: zahtjev.params.id },
                returning: true,
            });

            if (affectedRows > 0) {
                odgovor.status(200).json(azuriranKorisnik);
            } else {
                odgovor.status(404).json("Korisnik nije pronađen");
            }
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Možete ažurirati samo svoj profil");
    }
});

// DELETE: Brisanje korisnika
ruter.delete("/:id", verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.id === zahtjev.params.id || zahtjev.korisnik.isAdmin) {
        try {
            const rowsDeleted = await Korisnik.destroy({
                where: { id: zahtjev.params.id },
            });

            if (rowsDeleted > 0) {
                odgovor.status(200).json("Korisnik je obrisan");
            } else {
                odgovor.status(404).json("Korisnik nije pronađen");
            }
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Možete obrisati samo svoj profil");
    }
});

// GET: Dohvati korisnika po ID-u
ruter.get("/korisnik/:id", async (zahtjev, odgovor) => {
    try {
        const korisnik = await Korisnik.findByPk(zahtjev.params.id);

        if (korisnik) {
            const { password, ...ostalo } = korisnik.toJSON();
            odgovor.status(200).json(ostalo);
        } else {
            odgovor.status(404).json("Korisnik nije pronađen");
        }
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

// GET: Dohvati sve korisnike
ruter.get("/", verifikacija, async (zahtjev, odgovor) => {
    if (zahtjev.korisnik.isAdmin) {
        try {
            const query = zahtjev.query.new === "true";
            const korisnici = query
                ? await Korisnik.findAll({ order: [['id', 'DESC']], limit: 5 })
                : await Korisnik.findAll();

            odgovor.status(200).json(korisnici);
        } catch (greska) {
            odgovor.status(500).json(greska);
        }
    } else {
        odgovor.status(403).json("Niste autorizovani");
    }
});

// GET: Statistika po mjesecima
ruter.get("/statistika", async (zahtjev, odgovor) => {
    const { Op } = require('sequelize');
    const danasnjiDatum = new Date();
    const proslaGodina = new Date(danasnjiDatum.setFullYear(danasnjiDatum.getFullYear() - 1));

    try {
        const podaci = await Korisnik.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'mjesec'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'broj']
            ],
            where: { createdAt: { [Op.gte]: proslaGodina } },
            group: ['mjesec'],
            order: [['mjesec', 'ASC']]
        });

        odgovor.status(200).json(podaci);
    } catch (greska) {
        odgovor.status(500).json(greska);
    }
});

module.exports = ruter;

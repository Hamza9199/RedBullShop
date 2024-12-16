const jwt = require('jsonwebtoken');

const verifikacija = (zahtjev, odgovor, sljedeci) => {
    console.log("Autorizacija header:", zahtjev.headers.authorization); 
    const autHeder = zahtjev.headers.authorization;
    if (autHeder) {
        const token = autHeder.split(' ')[1];
        console.log("Token:", token); 

        jwt.verify(token, process.env.tajna, (greska, korisnik) => {
            if (greska) {
                return odgovor.status(403).json("Token nije validan");
            }

            zahtjev.korisnik = korisnik;
            sljedeci();
        });
    } else {
        return odgovor.status(401).json("Niste autorizovani");
    }
};

module.exports = verifikacija;

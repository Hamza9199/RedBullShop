const mongoose = require('mongoose');

const AdresaSchema = new mongoose.Schema({
    korisnikId: {
        type: String,
        required: true
    },
    ulica: {
        type: String,
        required: true,
        max: 255
    },
    grad: {
        type: String,
        required: true,
        max: 255
    },
    postanskiBroj: {
        type: String,
        required: true,
        max: 20
    },
    drzava: {
        type: String,
        required: true,
        max: 255
    },
}, {timestamps: true});

module.exports = mongoose.models.Adresa || mongoose.model('Adresa', AdresaSchema);

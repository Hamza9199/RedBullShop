const mongoose = require('mongoose');

const KorpaSchema = new mongoose.Schema({
    korisnikId: {
        type: String,
        required: true
    },
    proizvodi: [
        {
            proizvodId: {
                type: String,
                required: true
            },
            kolicina: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
    ukupnaCijena: {
        type: Number,
        required: true,
        min: 0
    }
}, {timestamps: true});

module.exports = mongoose.models.Korpa || mongoose.model('Korpa', KorpaSchema);

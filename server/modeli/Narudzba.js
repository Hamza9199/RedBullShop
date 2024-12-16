const mongoose = require('mongoose');

const NarudzbaSchema = new mongoose.Schema({
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
    adresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adresa',
        required: true
    },
    ukupnaCijena: {
        type: Number,
        required: true,
        min: 0
    },
    statusNarudzbe: {
        type: String,
        enum: ['Na čekanju', 'Obrađuje se', 'Isporučeno', 'Otkazano'],
        default: 'Na čekanju'
    },
    placanje: {
        metoda: {
            type: String,
            enum: ['Kartica', 'PayPal', 'Pouzećem'],
            required: true
        },
        status: {
            type: String,
            enum: ['Čeka se', 'Uspješno', 'Neuspješno'],
            default: 'Čeka se'
        },
        transakcijskiId: {
            type: String,
            required: function () {
                return this.placanje.metoda !== 'Pouzećem';
            }
        }
    }
}, {timestamps: true});

module.exports = mongoose.models.Narudzba || mongoose.model('Narudzba', NarudzbaSchema);

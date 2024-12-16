const mongoose = require('mongoose');

const RecenzijaSchema = new mongoose.Schema({
    korisnikId: {
        type: String,
        required: true
    },
    proizvodId: {
        type: String,
        required: true
    },
    ocjena: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    komentar: {
        type: String,
        max: 1024,
        default: "Bez komentara"
    }
}, {timestamps: true});

module.exports = mongoose.models.Recenzija || mongoose.model('Recenzija', RecenzijaSchema);

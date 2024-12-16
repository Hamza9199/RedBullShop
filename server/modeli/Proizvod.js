
const mongoose = require('mongoose');

const ProizvodSchema = new mongoose.Schema({
    naziv: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        
    },
    opis: {
        type: String,
        max: 255,
        min: 6,
        default: "Nema opisa"
    },
    kategorija: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    cijena: {
        type: Number,
        required: true,
        min: 0
    },
    slikaURL: {
        type: String,
        required: false,
        min: 6
    },
}, {timestamps: true});


module.exports = mongoose.models.Proizvod || mongoose.model('Proizvod', ProizvodSchema);
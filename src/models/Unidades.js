const mongoose = require('mongoose');

const Unidades = new mongoose.Schema({
    uf: String,
    cidade: String,
    endereco: String
});

module.exports = mongoose.model('Unidades', Unidades);
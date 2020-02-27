const mongoose = require('mongoose');

const Cargos = new mongoose.Schema({
    descricao: String
});

module.exports = mongoose.model('Cargos', Cargos);
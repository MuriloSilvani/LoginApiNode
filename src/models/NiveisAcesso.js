const mongoose = require('mongoose');

const NiveisAcesso = new mongoose.Schema({
    descricao: String
});

module.exports = mongoose.model('NiveisAcesso', NiveisAcesso);
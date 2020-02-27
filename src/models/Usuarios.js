const mongoose = require('mongoose');

const Usuarios = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    login: String,
    email: String,
    senha: String,
    nome: String,
    id_nivel_acesso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nivel_acesso',
    },
    id_cargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cargo',
    },
    id_unidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidade',
    },
    credito: Number,
    responsavel_unidade: Boolean
});

module.exports = mongoose.model('Usuarios', Usuarios);
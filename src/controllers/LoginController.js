const Usuarios = require('../models/Usuarios');

const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = {
    async login(req, res) {
        try {
            const { login, email, senha } = req.body;
            const responseDB = await Usuarios.findOne({
                $or: [
                    { login },
                    { email }
                ],
                senha: md5(senha)
            });
            if (responseDB) {
                return res.status(200).json({
                    message: "Usuário conectado!",
                    token: jwt.sign({ id: responseDB._id }, 'secret', {
                        expiresIn: 3600 // expires in 1h // 300=5min
                    }),
                    id: responseDB._id
                });
            } else {
                return res.status(200).json({ message: "Usuário e/ou senha incorretos!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}
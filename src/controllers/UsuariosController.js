const Usuarios = require("../models/Usuarios");

const md5 = require('md5');

module.exports = {
    // Cadastrar ===============================================================
    async store(req, res) {
        try {
            const { usuarios } = await req.body;

            const userExist = await Promise.all(
                usuarios.map(usuario =>
                    Usuarios.find({
                        $or: [
                            { login: usuario.login },
                            { email: usuario.email }
                        ]
                    })
                )
            );

            if (userExist[0] == null) {
                usuarios.map(usuario =>
                    Usuarios.create({
                        login: usuario.login,
                        email: usuario.email,
                        senha: md5(usuario.senha),
                        nome: usuario.nome,
                        id_nivel_acesso: usuario.id_nivel_acesso,
                        id_cargo: usuario.id_cargo,
                        id_unidade: usuario.id_unidade,
                        credito: usuario.credito,
                        responsavel_unidade: usuario.responsavel_unidade
                    })
                );

                return res.status(200).json({ message: "Usuário cadastrado!" });
            } else {
                return res.status(200).json({ message: "Usuário já existente!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Atualizar ===============================================================
    async update(req, res) {
        try {
            const { _id } = req.params;
            const { login, email, senha, nome, id_nivel_acesso, id_cargo, id_unidade, credito, responsavel_unidade } = req.body;


            const response = await Usuarios.updateOne(
                { _id },
                {
                    $set: {
                        login,
                        email,
                        senha: md5(senha),
                        nome,
                        id_nivel_acesso,
                        id_cargo,
                        id_unidade,
                        credito,
                        responsavel_unidade
                    }
                }
            );
            if (response.nModified != 0) {

                return res.status(200).json({ message: "Usuário atualizado!" });
            } else {
                if ((await Usuarios.findOne({ _id }))) {
                    return res.status(200).json({ message: "Usuário sem alterações!" });
                } else {
                    return res.status(200).json({ message: "Usuário não encontrado!" });
                }
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Deletar =================================================================
    async destroy(req, res) {
        try {
            const { _id } = req.params;
            const response = await Usuarios.deleteOne({ _id });
            return res.status(200).json({ message: "Usuário deletado!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar todos ============================================================
    async index(req, res) {
        try {
            const response = await Usuarios.find();
            return res.status(200).json({ message: "Usuários encontrados!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar um ===============================================================
    async show(req, res) {
        try {
            const { _id } = req.params;
            const response = await Usuarios.find({ _id });
            if (response[0]) {
                return res.status(200).json({ message: "Usuário encontrado!", return: response[0] });
            } else {
                return res.status(200).json({ message: "Usuário não encontrado!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

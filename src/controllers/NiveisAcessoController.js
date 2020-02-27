const NiveisAcesso = require("../models/NiveisAcesso");

module.exports = {
    // Cadastrar ===============================================================
    async store(req, res) {
        try {
            const { niveisAcesso } = req.body;
            const response = await Promise.all(
                niveisAcesso.map(nivelAcesso =>
                    NiveisAcesso.create({
                        descricao: nivelAcesso
                    })
                )
            );
            return res.status(200).json({ message: "Nível de acesso cadastrado!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Atualizar ===============================================================
    async update(req, res) {
        try {
            const { _id } = req.params;
            const { descricao } = req.body;
            const response = await NiveisAcesso.updateOne(
                { _id },
                { $set: { descricao } }
            );
            return res.status(200).json({ message: "Nível de acesso atualizado!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Deletar =================================================================
    async destroy(req, res) {
        try {
            const { _id } = req.params;
            const response = await NiveisAcesso.deleteOne({ _id })
            return res.status(200).json({ message: "Nível de acesso deletado!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar todos ============================================================
    async index(req, res) {
        try {
            const response = await NiveisAcesso.find();
            return res.status(200).json({ message: "Níveis de acesso encontrados!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar um ===============================================================
    async show(req, res) {
        try {
            const { _id } = req.params;
            const response = await NiveisAcesso.find({ _id });
            if (response[0]) {
                return res.status(200).json({ message: "Nível de acesso encontrado!", return: response[0] });
            } else {
                return res.status(200).json({ message: "Nível de acesso não encontrado!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

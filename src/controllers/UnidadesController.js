const Unidades = require("../models/Unidades");

module.exports = {
    // Cadastrar ===============================================================
    async store(req, res) {
        try {
            const { unidades } = req.body;
            const response = await Promise.all(
                unidades.map(unidade =>
                    Unidades.create({
                        uf: unidade.uf,
                        cidade: unidade.cidade,
                        endereco: unidade.endereco
                    })
                )
            );
            return res.status(200).json({ message: "Unidade cadastrada!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Atualizar ===============================================================
    async update(req, res) {
        try {
            const { _id } = req.params;
            const { uf, cidade, endereco } = req.body;
            const response = await Unidades.updateOne(
                { _id },
                { $set: { uf, cidade, endereco } }
            );
            return res.status(200).json({ message: "Unidade atualizada!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Deletar =================================================================
    async destroy(req, res) {
        try {
            const { _id } = req.params;
            const response = await Unidades.deleteOne({ _id });
            return res.status(200).json({ message: "Unidade deletada!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar todos ============================================================
    async index(req, res) {
        try {
            const response = await Unidades.find();
            return res.status(200).json({ message: "Unidades encontradas!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar um ===============================================================
    async show(req, res) {
        try {
            const { _id } = req.params;
            const response = await Unidades.find({ _id });
            if (response[0]) {
                return res.status(200).json({ message: "Unidade encontrada!", return: response[0] });
            } else {
                return res.status(200).json({ message: "Unidade não encontrada!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

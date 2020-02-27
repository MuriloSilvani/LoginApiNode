const Cargos = require("../models/Cargos");

module.exports = {
    // Cadastrar ===============================================================
    async store(req, res) {
        try {
            const { cargos } = req.body;
            const response = [];
            cargos.map(async cargo => {
                const existent = await Cargos.find({
                    descricao: cargo
                });
                existent.length <= 0 &&
                    await response.push(await Promise.resolve(
                        Cargos.create({
                            descricao: cargo
                        })
                    ));
            })
            return res.status(200).json({ message: "Cargo cadastrado!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Atualizar ===============================================================
    async update(req, res) {
        try {
            const { _id } = req.params;
            const { descricao } = req.body;
            const response = await Cargos.updateOne(
                { _id },
                { $set: { descricao } }
            );
            return res.status(200).json({ message: "Cargo atualizado!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Deletar =================================================================
    async destroy(req, res) {
        try {
            const { _id } = req.params;
            const response = await Cargos.deleteOne({ _id });
            return res.status(200).json({ message: "Cargo deletado!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar todos ============================================================
    async index(req, res) {
        try {
            const response = await Cargos.find();
            return res.status(200).json({ message: "Cargos encontrados!", return: response });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Listar um ===============================================================
    async show(req, res) {
        try {
            const { _id } = req.params;
            const response = await Cargos.find({ _id });
            if (response[0]) {
                return res.status(200).json({ message: "Cargo encontrado!", return: response[0] });
            } else {
                return res.status(200).json({ message: "Cargo não encontrado!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('O servidor está rodando!!!');
});

const cargosRoutes = require('./cargos/cargosRoutes');
const niveisAcessoRoutes = require('./niveisAcesso/niveisAcessoRoutes');
const unidadesRoutes = require('./unidades/unidadesRoutes');
const usuariosRoutes = require('./usuarios/usuariosRoutes');

const LoginController = require('../controllers/LoginController');

routes.post('/login', LoginController.login);

//verifyJWT
routes.use('/cargos', cargosRoutes);
routes.use('/niveisAcesso', niveisAcessoRoutes);
routes.use('/unidades', unidadesRoutes);
routes.use('/usuarios', usuariosRoutes);

var jwt = require('jsonwebtoken');
function verifyJWT(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }
    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = routes;
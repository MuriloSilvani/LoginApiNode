const express = require('express');
const routes = express.Router();

const NiveisAcessoController = require('../../controllers/NiveisAcessoController');

routes.post('/store', NiveisAcessoController.store);
routes.post('/update/:_id', NiveisAcessoController.update);
routes.delete('/destroy/:_id', NiveisAcessoController.destroy);
routes.get('/index', NiveisAcessoController.index);
routes.get('/show/:_id', NiveisAcessoController.show);

module.exports = routes;
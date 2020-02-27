const express = require('express');
const routes = express.Router();

const UsuariosController = require('../../controllers/UsuariosController');

routes.post('/store', UsuariosController.store);
routes.post('/update/:_id', UsuariosController.update);
routes.delete('/destroy/:_id', UsuariosController.destroy);
routes.get('/index', UsuariosController.index);
routes.get('/show/:_id', UsuariosController.show);

module.exports = routes;
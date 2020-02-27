const express = require('express');
const routes = express.Router();

const CargosController = require('../../controllers/CargosController');

routes.post('/store', CargosController.store);
routes.post('/update/:_id', CargosController.update);
routes.delete('/destroy/:_id', CargosController.destroy);
routes.get('/index', CargosController.index);
routes.get('/show/:_id', CargosController.show);

module.exports = routes;
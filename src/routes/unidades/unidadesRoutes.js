const express = require('express');
const routes = express.Router();

const UnidadesController = require('../../controllers/UnidadesController');

routes.post('/store', UnidadesController.store);
routes.post('/update/:_id', UnidadesController.update);
routes.delete('/destroy/:_id', UnidadesController.destroy);
routes.get('/index', UnidadesController.index);
routes.get('/show/:_id', UnidadesController.show);

module.exports = routes;
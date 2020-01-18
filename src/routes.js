const { Router } = require('express');
const routes = Router();

const DevController = require('./controllers/devController');
const SearchController = require('./controllers/searchController');

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.create);
routes.get('/search', SearchController.index);

module.exports = routes;
const Dev = require('../models/dev');
const parseStringToArray = require('../utils/parseStringToArray');

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query
    const arrayTechs = parseStringToArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: arrayTechs
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      }
    })
    return res.json(devs);
  }
}

module.exports = new SearchController();
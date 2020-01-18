const Dev = require('../models/dev');
const axios = require('axios');
const parseStringToArray = require('../utils/parseStringToArray');
const { findConnections, sendMessage } = require('../websocket');

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }

  async create(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(`http://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio} = response.data;
      
      const arrayTechs = parseStringToArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
      
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: arrayTechs,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        arrayTechs,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  }
}

module.exports = new DevController();
const { Router } = require('express');
const Butterfly = require('../models/Butterfly');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const butterfly = await Butterfly.insert(req.body);
    return res.send(butterfly);
  } catch (error) {
    next(error);
  }
});

const { Router } = require('express');
const Butterfly = require('../models/Butterfly');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const butterfly = await Butterfly.insert(req.body);
      res.send(butterfly);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const butterflies = await Butterfly.getAll();
      res.send(butterflies);
    } catch (error) {
      next(error);
    }
  });

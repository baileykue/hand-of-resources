const { Router } = require('express');
const Chicken = require('../models/Chicken');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const chicken = await Chicken.insert(req.body);
      res.send(chicken);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const chicken = await Chicken.getById(id);
      res.send(chicken);
    } catch (error) {
      next(error);
    }
  });

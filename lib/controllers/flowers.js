const { Router } = require('express');
const Flower = require('../models/Flower');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const flowers = await Flower.getAll();
      res.send(flowers);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const flower = await Flower.deleteById(id);
      res.send(flower);
    } catch (error) {
      next(error);
    }
  });

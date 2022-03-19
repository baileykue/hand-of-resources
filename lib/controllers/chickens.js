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
  })

  .get('/', async (req, res, next) => {
    try {
      const chickens = await Chicken.getAll();
      res.send(chickens);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedChicken = await Chicken.updateById(id, req.body);
      res.send(updatedChicken);
    } catch (error) {
      next(error);
    }
  });

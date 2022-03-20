const { Router } = require('express');
const Flower = require('../models/Flower');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const flower = await Flower.insert(req.body);
      res.send(flower);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const flower = await Flower.getById(id);
      res.send(flower);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const flowers = await Flower.getAll();
      res.send(flowers);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedFlower = await Flower.updateById(id, req.body);
      res.send(updatedFlower);
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

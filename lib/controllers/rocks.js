const { Router } = require('express');
const Rock = require('../models/Rock');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const rock = await Rock.getById(id);
      res.send(rock);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const rock = await Rock.updateById(id, req.body);
      res.send(rock);
    } catch (error) {
      next(error);
    }
  });

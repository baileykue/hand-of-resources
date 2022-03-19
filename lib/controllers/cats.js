const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const cat = await Cat.insert(req.body);
      res.send(cat);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const cat = await Cat.getById(id);
      res.send(cat);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const cats = await Cat.getAll();
      res.send(cats);
    } catch (error) {
      next(error);
    }
  });

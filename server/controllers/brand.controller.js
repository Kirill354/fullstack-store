const { Brand } = require('../models/models');

class BrandController {
   async create(req, res) {
      try {
         const { name } = req.body;
         const brand = await Brand.create({ name });

         return res.json(brand);
      } catch (error) {}
   }

   async getAll(req, res) {
      try {
         const brands = await Brand.findAll();

         return res.json(brands);
      } catch (error) {}
   }
}

module.exports = new BrandController();

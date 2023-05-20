const { Type } = require('../models/models');

class TypeController {
   async create(req, res) {
      try {
         const { name } = req.body;
         const type = await Type.create({ name });

         return res.json(type);
      } catch (error) {}
   }

   async getAll(req, res) {
      try {
         const types = await Type.findAll();

         return res.json(types);
      } catch (error) {}
   }

   async delete(req, res) {
      try {
         const id = req.params.id;
         const types = await Type.destroy({
            where: { id },
         });

         return res.json('ok');
      } catch (error) {}
   }
}

module.exports = new TypeController();

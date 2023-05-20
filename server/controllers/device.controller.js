const { Device, DeviceInfo } = require('../models/models');
const path = require('path');
const uuid = require('uuid');
const ApiError = require('../error/ApiError');

class DeviceController {
   async create(req, res, next) {
      try {
         let { name, price, brandId, typeId, info } = req.body;
         const { img } = req.files;

         let filename = uuid.v4() + '.jpg';
         img.mv(path.resolve(__dirname, '..', 'static', filename));

         const device = await Device.create({ name, price, brandId, typeId, img: filename });

         if (info) {
            info = JSON.parse(info);
            info.forEach((item) => {
               DeviceInfo.create({
                  title: item.title,
                  description: item.description,
                  deviceId: device.id,
               });
            });
         }

         return res.json(device);
      } catch (error) {
         next(ApiError.badRequest(error.message));
      }
   }

   async getAll(req, res) {
      try {
         let { brandId, typeId, page, limit } = req.query;
         page = page || 1;
         limit = limit || 9;
         let offset = page * limit - limit;

         const devices = await Device.findAndCountAll({
            where: {
               ...(brandId && {
                  brandId,
               }),
               ...(typeId && {
                  typeId,
               }),
            },
            limit,
            offset,
         });

         return res.json(devices);
      } catch (error) {}
   }

   async getOne(req, res) {
      try {
         const { id } = req.params;

         const device = await Device.findOne({
            where: { id },
            include: [
               {
                  model: DeviceInfo,
                  as: 'info',
               },
            ],
         });

         return res.json(device);
      } catch (error) {}
   }
}

module.exports = new DeviceController();

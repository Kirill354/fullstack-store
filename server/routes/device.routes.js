const express = require('express');
const DeviceController = require('../controllers/device.controller');
const router = express.Router();
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);

module.exports = router;

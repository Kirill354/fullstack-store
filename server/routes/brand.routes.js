const express = require('express');
const BrandController = require('../controllers/brand.controller');
const router = express.Router();
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), BrandController.create);
router.get('/', BrandController.getAll);

module.exports = router;

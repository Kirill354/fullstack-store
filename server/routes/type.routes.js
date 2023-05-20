const express = require('express');
const TypeController = require('../controllers/type.controller');
const router = express.Router();
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), TypeController.create);
router.get('/', TypeController.getAll);
router.delete('/:id', checkRole('ADMIN'), TypeController.delete);

module.exports = router;

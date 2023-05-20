const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const deviceRouter = require('./device.routes');
const brandRouter = require('./brand.routes');
const typeRouter = require('./type.routes');

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);

module.exports = router;

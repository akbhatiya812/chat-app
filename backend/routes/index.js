const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./users'));
router.use('/message', require('./message'));


module.exports = router;
const router = require('express').Router();
const { validateSingnup } = require('../configs/validate');
const { createUser } = require('../controllers/users');

router.post('/', validateSingnup, createUser);

module.exports = router;

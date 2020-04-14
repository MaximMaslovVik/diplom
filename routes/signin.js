const router = require('express').Router();
const { validateSingnin } = require('../configs/validate');
const { login } = require('../controllers/users');

router.post('/', validateSingnin, login);

module.exports = router;

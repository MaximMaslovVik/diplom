const router = require('express').Router();
const { validateUsersGet } = require('../configs/validate');
const { getUser } = require('../controllers/users');

router.get('/', validateUsersGet, getUser);

module.exports = router;

const router = require('express').Router();
const crashTest = require('./crash-error');
const auth = require('../middlewares/auth');

const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const articles = require('./articles');
const errorApp = require('./app');

router.use('/', crashTest);
router.use('/', signin);
router.use('/', signup);
router.use('/users', auth, users);
router.use('/articles', auth, articles);
router.use('/', errorApp);

module.exports = router;

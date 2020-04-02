const router = require('express').Router();

const auth = require('../middlewares/auth');

const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const articles = require('./articles');
const errorApp = require('./app');
const crashTest = require('./crash-error');

router.use('/', signin);
router.use('/', signup);
router.use('/users', auth, users);
router.use('/articles', auth, articles);
router.use('/', errorApp);
router.use('/', crashTest);

module.exports = router;

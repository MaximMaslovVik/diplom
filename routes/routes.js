const router = require('express').Router();
const routerCrash = require('./crash-error');

const routerSignin = require('./signin');
const routerSignup = require('./signup');

const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerArticles = require('./articles');
const errorApp = require('./app');

router.use('/', routerCrash);

router.use('/signin', routerSignin);
router.use('/signup', routerSignup);
router.use('/users', auth, routerUsers);
router.use('/articles', auth, routerArticles);
router.use('/', errorApp);

module.exports = router;

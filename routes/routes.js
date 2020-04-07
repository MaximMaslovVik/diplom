const router = require('express').Router();

const { ErrorNotFound } = require('../errors/index');
const { BAD_REQUEST } = require('../configs/constants');

const routerSignin = require('./signin');
const routerSignup = require('./signup');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerArticles = require('./articles');

router.use('/signin', routerSignin);
router.use('/signup', routerSignup);
router.use('/users/me', auth, routerUsers);
router.use('/articles', auth, routerArticles);

router.use('*', (req, res, next) => next(new ErrorNotFound(BAD_REQUEST)));

module.exports = router;

const router = require('express').Router();
/*
const { ErrorNotFound } = require('../errors/index');
const { AUTH } = require('../configs/constants');
*/
const routerSignin = require('./signin');
const routerSignup = require('./signup');
const { getAUTH } = require('../middlewares/auth');
const routerUsers = require('./users');
const routerArticles = require('./articles');
const errorRouter = require('./app');

router.use('/signin', routerSignin);
router.use('/signup', routerSignup);
router.use('/users/me', getAUTH, routerUsers);
router.use('/articles', getAUTH, routerArticles);

router.use('*', errorRouter);

module.exports = router;

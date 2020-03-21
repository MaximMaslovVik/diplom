const router = require('express').Router();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Что то пошло не так, загрузка сервера  прервана');
  }, 0);
});

module.exports = router;

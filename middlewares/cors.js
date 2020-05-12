const allowedCors = [
  'http://localhost:3000',
  'http://diplom-max.ml',
  'http://localhost:8080',
  'http://localhost:8081',
];

const corsChecker = (req, res, next) => {
  const { origin } = req.headers;

    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.status(200);
    }

    next();
};

module.exports = { corsChecker };
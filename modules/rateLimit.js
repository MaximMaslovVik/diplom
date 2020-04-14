const rateLimit = require('express-rate-limit');

const { RATE_LIMIT } = require('../configs/constants');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: RATE_LIMIT,
});

//  apply to all requests
module.exports = limiter;

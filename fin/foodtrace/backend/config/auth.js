module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    jwtCookieExpire: process.env.JWT_COOKIE_EXPIRE || 30
  };
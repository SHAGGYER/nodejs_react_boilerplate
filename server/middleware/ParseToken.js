const jwt = require("jsonwebtoken");

exports.ParseToken = (req, res, next) => {
  if (!req.cookies.token) return next();

  try {
    const { userId, userAccessLevel } = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    if (!userId) {
      return next();
    }

    res.locals.userId = userId;
    res.locals.userAccessLevel = userAccessLevel;
    return next();
  } catch (e) {
    return next();
  }
};

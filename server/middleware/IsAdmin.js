exports.IsAdmin = (req, res, next) => {
  if (!res.locals.userId) {
    return res.status(403).send({ error: "NOT_AUTHENTICATED" });
  } else if (res.locals.userAccessLevel !== "Admin") {
    return res.status(403).send({ error: "NOT_ADMIN" });
  }

  return next();
};

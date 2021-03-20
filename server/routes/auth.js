const router = require("express").Router();
const {
  init,
  login,
  register,
  logout,
} = require("../controllers/AuthController");

router.get("/api/auth/init", init);
router.post("/api/auth/login", login);
router.post("/api/auth/register", register);
router.get("/api/auth/logout", logout);

module.exports = router;

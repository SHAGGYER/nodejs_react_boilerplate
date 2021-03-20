const router = require("express").Router();

router.use(require("./auth"));
router.use(require("./public"));

module.exports = router;

const express = require("express");
const path = require("path");

const router = express.Router();

router.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

router.use("/static", express.static(path.join(__dirname, "..", "static")));

router.use(
  "/assets",
  express.static(path.join(__dirname, "../..", "client/dist"))
);

router.get("*", async (req, res) => {
  res.render("app", {
    csrfToken: req.csrfToken(),
  });
});

module.exports = router;

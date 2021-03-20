const cookieParser = require("cookie-parser");
const express = require("express");
const { config } = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const { ParseToken } = require("../middleware/ParseToken");

config({ path: path.resolve(__dirname, "../.env") });

exports.App = class {
  constructor() {
    this.app = express();
    this.app.set("view engine", "ejs");
    this.app.use(bodyParser.json());
  }

  useCookies() {
    this.app.use(cookieParser());
  }

  useMongoDb() {
    mongoose.connect(
      process.env.DATABASE_URI,
      {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("MongoDB started...")
    );
  }

  useCsrf() {
    this.app.use(csrf({ cookie: true }));
    this.app.use(function (error, req, res, next) {
      if (error.code !== "EBADCSRFTOKEN") return next(error);

      res.status(403);

      return res.send({ message: "Session expired, please refresh website." });
    });
  }

  loadRoutes() {
    this.app.use(require("../routes"));
  }

  run() {
    this.app.use(ParseToken);
    this.loadRoutes();

    const port = process.env.NODE_PORT;
    this.app.listen(port, () =>
      console.log(`Server started on port ${port}...`)
    );
  }
};

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { ValidationService } = require("../services/ValidationService");
const validator = require("validator");
const bcrypt = require("bcryptjs");

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

exports.init = async (_req, res) => {
  let user = null;

  if (res.locals.userId) {
    user = await User.findById(res.locals.userId);
  }

  return res.send({ user });
};

exports.login = async (req, res) => {
  const existingUser = await User.findOne({
    email: req.body.email.trim().toLowerCase(),
  });

  const errors = await ValidationService.run(
    {
      email: [
        [(val) => !val, "Email is required"],
        [(val) => !validator.isEmail(val), "Email must be in correct format"],
        [
          (val) => {
            return !existingUser;
          },
          "User with this email does not exist",
        ],
      ],
      password: [
        [(val) => !val, "Password is required"],
        [
          async (val) => {
            if (!existingUser) return false;

            const passwordEquals = await bcrypt.compare(
              val,
              existingUser.password
            );
            return !passwordEquals;
          },
          "Password is incorrect",
        ],
      ],
    },
    req.body
  );

  if (Object.keys(errors).length) {
    return res.status(400).send({ errors });
  }

  const { email, password } = req.body;
  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });
  if (!user) {
    return res.status(400).send({ error: "Could not log you in" });
  }

  const passwordEquals = await bcrypt.compare(password, user.password);
  if (!passwordEquals) {
    return res.status(400).send({ error: "Could not log you in" });
  }

  const jwtUserData = {
    userId: user._id,
    userRole: user.role,
  };
  const token = jwt.sign(jwtUserData, process.env.JWT_SECRET);

  res.cookie("token", token);
  return res.sendStatus(204);
};

exports.register = async (req, res) => {
  const errors = await ValidationService.run(
    {
      email: [
        [(val) => !val, "Email is required"],
        [(val) => !validator.isEmail(val), "Email must be in correct format"],
        [
          async (val) => {
            const existingUser = await User.findOne({
              email: val.trim().toLowerCase(),
            });
            return !!existingUser;
          },
          "User with this email already exists",
        ],
      ],
      password: [
        [(val) => !val, "Password is required"],
        [
          (val) => val.length < 6,
          "Password must be at least 6 characters long",
        ],
      ],
      passwordAgain: [
        [(val) => !val, "Password Confirmation is required"],
        [(val) => val !== req.body.password, "Passwords must match"],
      ],
    },
    req.body
  );

  if (Object.keys(errors).length) {
    return res.status(400).send({ errors });
  }

  const { email, password } = req.body;

  const usersCount = await User.countDocuments();

  const admin = User({
    email,
    password,
    role: usersCount ? "user" : "admin",
  });
  await admin.save();

  res.sendStatus(201);
};

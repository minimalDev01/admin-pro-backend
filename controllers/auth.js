const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify email
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email not found", // Usually (for security), on both email and password verifying -> "Email or password not valid"
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password not valid",
      });
    }

    // Generate token - JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(userDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      user = new User({
        name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      // User exists
      user = userDB;
      user.google = true;
    }

    // Save on database
    await user.save();

    // Generate token - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(user.role),
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token not valid",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generate token - JWT
  const token = await generateJWT(uid);

  // Get user by ID
  const user = await User.findById(uid);

  res.json({
    ok: true,
    token,
    user,
    menu: getMenuFrontEnd(user.role),
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};

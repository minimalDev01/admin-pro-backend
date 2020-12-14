const { response } = require("express");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = (req, res = response, next) => {
  // Read token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token not found",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token not valid",
    });
  }
};

const validateADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User doesn't exist",
      });
    }

    if (userDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "You don't have privileges for that action",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

const validateADMIN_ROLE_or_SameUser = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User doesn't exist",
      });
    }

    if (userDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "You don't have privileges for that action",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

module.exports = {
  validateJWT,
  validateADMIN_ROLE,
  validateADMIN_ROLE_or_SameUser,
};

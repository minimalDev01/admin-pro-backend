/*
    Route: /api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = new Router();

router.post(
  "/",
  [
    check("email", "Email required").isEmail(),
    check("password", "Password required").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;

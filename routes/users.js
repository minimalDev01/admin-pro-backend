/*
    Route: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);
router.post(
  "/",
  [
    check("name", "Name required").not().isEmpty(),
    check("password", "Password required").not().isEmpty(),
    check("email", "Email required").isEmail(),
    validateFields,
  ],
  createUser
);
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name required").not().isEmpty(),
    check("email", "Email required").isEmail(),
    check("role", "Role required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);
router.delete("/:id", validateJWT, deleteUser);

module.exports = router;

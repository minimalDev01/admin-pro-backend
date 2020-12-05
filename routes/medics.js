/*
    Route: /api/medics
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { validateJWT } = require("../middlewares/validate-jwt");

const {
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic,
} = require("../controllers/medics");

const router = Router();

router.get("/", getMedics);
router.post(
  "/",
  [
    validateJWT,
    check("name", "Medic name required").not().isEmpty(),
    check("name", "Hospital ID must be valid").isMongoId(),
    validateFields,
  ],
  createMedic
);
router.put("/:id", [], updateMedic);
router.delete("/:id", deleteMedic);

module.exports = router;

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
  getMedicByID,
} = require("../controllers/medics");

const router = Router();

router.get("/", validateJWT, getMedics);
router.post(
  "/",
  [
    validateJWT,
    check("name", "Medic name required").not().isEmpty(),
    check("hospital", "Hospital ID must be valid").isMongoId(),
    validateFields,
  ],
  createMedic
);
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Medic name required").not().isEmpty(),
    check("hospital", "Hospital ID must be valid").isMongoId(),
    validateFields,
  ],
  updateMedic
);
router.delete("/:id", validateJWT, deleteMedic);

router.get("/:id", validateJWT, getMedicByID);

module.exports = router;

/*
    Route: api/uploads
*/

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");

const { fileUpload, returnImage } = require("../controllers/uploads");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.use(expressFileUpload());
router.put("/:type/:id", validateJWT, fileUpload);
router.get("/:type/:photo", returnImage);

module.exports = router;

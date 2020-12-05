/*
    Route: api/all
*/

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");

const { getAll, getCollectionDocuments } = require("../controllers/search");

const router = Router();

router.get("/:search", validateJWT, getAll);
router.get("/collection/:table/:search", validateJWT, getCollectionDocuments);

module.exports = router;

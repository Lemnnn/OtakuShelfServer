const express = require("express");
const { getUserData } = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");

const router = express.Router();

router.post("/me", tokenValidation, getUserData);

module.exports = router;

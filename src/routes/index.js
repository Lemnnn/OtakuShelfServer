const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const favoritesRoutes = require("./favoritesRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/favorite", favoritesRoutes);

module.exports = router;
